import { useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { parseNumber, toOptionalString, useEmpresas } from '@shared/index';
import { useFormValidation } from '@shared/infrastructure/input/adapter/hooks/useFormValidation';
import { required } from '@shared/infrastructure/input/adapter/validation/formValidation';
import { useRubrosidomain } from './useRubrosidomain';
import { useRubrosCatalogs } from './useRubrosCatalogs';
import {
  RubroIDOFormState,
  RubroIDOFilterState,
  initialRubroIDOForm,
  initialRubroIDOFilters,
} from './rubrosidomainPage.types';

export function useRubrosidomainPageController() {
  // Data sources
  const {
    items,
    loading,
    error,
    totalElements,
    page,
    fetchAll,
    create,
    update,
    remove,
    clearError,
  } = useRubrosidomain(false);

  const { items: empresas } = useEmpresas();
  const { rubros, error: catalogsError } = useRubrosCatalogs();
  const { validate, getError, hasError, clearErrors } = useFormValidation();

  // Form state
  const methods = useForm<RubroIDOFormState>({
    defaultValues: initialRubroIDOForm,
  });

  // Filter and UI state
  const [filters, setFilters] = useState<RubroIDOFilterState>(initialRubroIDOFilters);
  const [submittedFilters, setSubmittedFilters] = useState<RubroIDOFilterState>(initialRubroIDOFilters);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  // Statistics
  const activos = useMemo(
    () => items.filter((item) => item.estado?.toUpperCase() === 'ACTIVO').length,
    [items],
  );

  const enviados = useMemo(
    () => items.filter((item) => item.flagEnvio === 1).length,
    [items],
  );

  // Fetch data when filters change
  useEffect(() => {
    if (!submittedFilters.empresaId) {
      return;
    }

    void fetchAll({
      page,
      size: 10,
      empresaId: Number(submittedFilters.empresaId),
      rubroId: toOptionalString(submittedFilters.rubroId),
      colaboradorId: parseNumber(submittedFilters.colaboradorId),
      estado: toOptionalString(submittedFilters.estado),
      fechaDesde: toOptionalString(submittedFilters.fechaDesde),
      fechaHasta: toOptionalString(submittedFilters.fechaHasta),
    });
  }, [fetchAll, page, submittedFilters]);

  // Filter handlers
  const setFilterField = <K extends keyof RubroIDOFilterState>(
    field: K,
    value: RubroIDOFilterState[K],
  ) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const handleSearch = () => {
    const result = validate(
      { empresaId: filters.empresaId },
      {
        empresaId: [required('Seleccione la empresa para consultar rubros IDO')],
      },
    );

    if (!result.isValid) {
      return;
    }

    setSubmittedFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters(initialRubroIDOFilters);
    setSubmittedFilters(initialRubroIDOFilters);
  };

  // Form handlers
  const resetForm = () => {
    methods.reset(initialRubroIDOForm);
    setSelectedId(null);
    clearErrors();
  };

  const handleSave: SubmitHandler<RubroIDOFormState> = async (formValues) => {
    const result = validate(
      {
        empresaId: formValues.empresaId,
        rubroId: formValues.rubroId,
        colaboradorId: formValues.colaboradorId,
        tipoComportamiento: formValues.tipoComportamiento,
        valor01: formValues.valor01,
        fechaDesde: formValues.fechaDesde,
        fechaHasta: formValues.fechaHasta,
      },
      {
        empresaId: [required('Seleccione la empresa')],
        rubroId: [required('Seleccione un rubro')],
        colaboradorId: [required('Ingrese el identificador de colaborador')],
        tipoComportamiento: [required('Seleccione el tipo de aplicación')],
        valor01: [required('Ingrese el valor principal')],
        fechaDesde: [required('Seleccione fecha desde')],
        fechaHasta: [required('Seleccione fecha hasta')],
      },
    );

    if (!result.isValid) {
      return;
    }

    const payload = {
      empresaId: Number(formValues.empresaId),
      rubroId: formValues.rubroId,
      colaboradorId: Number(formValues.colaboradorId),
      tipoComportamiento: Number(formValues.tipoComportamiento),
      valor01: Number(formValues.valor01),
      valor02: formValues.valor02 ? Number(formValues.valor02) : undefined,
      estado: toOptionalString(formValues.estado),
      fechaDesde: formValues.fechaDesde,
      fechaHasta: formValues.fechaHasta,
    };

    if (selectedItem) {
      await update(selectedItem.id, payload);
    } else {
      await create(payload);
    }

    resetForm();
  };

  const handleDelete = async (itemId: number) => {
    if (!window.confirm('¿Eliminar el rubro IDO seleccionado?')) {
      return;
    }

    await remove(itemId);
    if (selectedId === itemId) {
      resetForm();
    }
  };

  const handleSelectItem = (item: any) => {
    setSelectedId(item.id);
    methods.reset({
      empresaId: String(item.empresaId ?? ''),
      rubroId: item.rubroId ?? '',
      colaboradorId: String(item.colaboradorId ?? ''),
      tipoComportamiento: String(item.tipoComportamiento ?? 1),
      valor01: String(item.valor01 ?? ''),
      valor02: String(item.valor02 ?? ''),
      estado: item.estado ?? 'ACTIVO',
      fechaDesde: item.fechaDesde ? item.fechaDesde.slice(0, 10) : '',
      fechaHasta: item.fechaHasta ? item.fechaHasta.slice(0, 10) : '',
    });
  };

  const handlePageChange = async (nextPage: number) => {
    void fetchAll({
      page: nextPage,
      size: 10,
      empresaId: Number(submittedFilters.empresaId),
      rubroId: toOptionalString(submittedFilters.rubroId),
      colaboradorId: parseNumber(submittedFilters.colaboradorId),
      estado: toOptionalString(submittedFilters.estado),
      fechaDesde: toOptionalString(submittedFilters.fechaDesde),
      fechaHasta: toOptionalString(submittedFilters.fechaHasta),
    });
  };

  const handleRetry = () => {
    clearError();
    if (submittedFilters.empresaId) {
      void fetchAll({
        page: 0,
        size: 10,
        empresaId: Number(submittedFilters.empresaId),
        rubroId: toOptionalString(submittedFilters.rubroId),
      });
    }
  };

  return {
    // Data
    items,
    empresas,
    rubros,
    selectedItem,
    totalElements,
    activos,
    enviados,
    page,

    // State
    methods,
    filters,
    submittedFilters,
    selectedId,
    loading,
    error,
    catalogsError,

    // Handlers
    setFilterField,
    handleSearch,
    handleResetFilters,
    handleSave,
    handleDelete,
    handleSelectItem,
    handlePageChange,
    handleRetry,
    resetForm,

    // Utilities
    getError,
    hasError,
    clearError,
    clearErrors,
  };
}
