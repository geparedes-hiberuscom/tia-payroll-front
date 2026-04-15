import { useEffect, useMemo, useState } from 'react';
import { parseNumber, toOptionalString, useEmpresas } from '@shared/index';
import { useFormValidation } from '@shared/infrastructure/input/adapter/hooks/useFormValidation';
import { required } from '@shared/infrastructure/input/adapter/validation/formValidation';
import { useConsultarubrosidolist } from './useConsultarubrosidolist';
import { useRubrosCatalogs } from './useRubrosCatalogs';
import { ConsultaFilterState, initialConsultaFilters } from './consultarubrosidolistPage.types';

export function useConsultarubrosidolistPageController() {
  const {
    items,
    loading,
    error,
    totalElements,
    page,
    fetchAll,
    exportar,
    cambiarEstado,
    remove,
    clearError,
  } = useConsultarubrosidolist();
  const { items: empresas } = useEmpresas();
  const { rubros, error: catalogsError } = useRubrosCatalogs();
  const { validate, getError, hasError } = useFormValidation();

  const [filters, setFilters] = useState<ConsultaFilterState>(initialConsultaFilters);
  const [submittedFilters, setSubmittedFilters] = useState<ConsultaFilterState>(initialConsultaFilters);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [nextEstado, setNextEstado] = useState('ACTIVO');

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  const enviados = useMemo(
    () => items.filter((item) => item.flagEnvio === 1).length,
    [items],
  );

  useEffect(() => {
    if (!submittedFilters.empresaId) {
      return;
    }

    void fetchAll({
      page,
      size: 10,
      empresaId: Number(submittedFilters.empresaId),
      localidadId: parseNumber(submittedFilters.localidadId),
      rubroId: toOptionalString(submittedFilters.rubroId),
      colaboradorId: parseNumber(submittedFilters.colaboradorId),
      fechaDesde: toOptionalString(submittedFilters.fecha),
      fechaHasta: toOptionalString(submittedFilters.fecha),
    });
  }, [fetchAll, page, submittedFilters]);

  const setFilterField = <K extends keyof ConsultaFilterState>(
    field: K,
    value: ConsultaFilterState[K],
  ) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const buildQueryFromFilter = (source: ConsultaFilterState) => ({
    empresaId: Number(source.empresaId),
    localidadId: parseNumber(source.localidadId),
    rubroId: toOptionalString(source.rubroId),
    colaboradorId: parseNumber(source.colaboradorId),
    fechaDesde: toOptionalString(source.fecha),
    fechaHasta: toOptionalString(source.fecha),
  });

  const handleSearch = () => {
    const result = validate(
      { empresaId: filters.empresaId },
      { empresaId: [required('Seleccione la empresa para consultar rubros IDO')] },
    );

    if (!result.isValid) {
      return;
    }

    setSubmittedFilters(filters);
  };

  const handleReset = () => {
    setFilters(initialConsultaFilters);
    setSubmittedFilters(initialConsultaFilters);
  };

  const handleExport = async () => {
    const result = validate(
      { empresaId: filters.empresaId },
      { empresaId: [required('Seleccione la empresa antes de exportar')] },
    );

    if (!result.isValid) {
      return;
    }

    const blob = await exportar(buildQueryFromFilter(filters));

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `consulta-rubros-ido-${Date.now()}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEstado = async () => {
    if (!selectedItem) {
      return;
    }

    await cambiarEstado(selectedItem.id, nextEstado);
  };

  const handleDelete = async (itemId: number) => {
    if (!window.confirm('¿Eliminar el rubro IDO seleccionado desde la consulta operativa?')) {
      return;
    }

    await remove(itemId);
    if (selectedId === itemId) {
      setSelectedId(null);
    }
  };

  const handlePageChange = async (nextPage: number) => {
    await fetchAll({
      page: nextPage,
      size: 10,
      ...buildQueryFromFilter(submittedFilters),
    });
  };

  const handleRetry = async () => {
    clearError();
    await fetchAll();
  };

  return {
    items,
    loading,
    error,
    catalogsError,
    totalElements,
    page,
    empresas,
    rubros,
    filters,
    nextEstado,
    selectedItem,
    enviados,
    getError,
    hasError,
    setSelectedId,
    setNextEstado,
    setFilterField,
    handleSearch,
    handleReset,
    handleExport,
    handleEstado,
    handleDelete,
    handlePageChange,
    handleRetry,
  };
}
