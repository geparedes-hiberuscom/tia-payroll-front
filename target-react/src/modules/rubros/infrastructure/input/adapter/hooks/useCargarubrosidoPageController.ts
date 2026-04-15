import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toOptionalString, useEmpresas } from '@shared/index';
import { useFormValidation } from '@shared/infrastructure/input/adapter/hooks/useFormValidation';
import { required } from '@shared/infrastructure/input/adapter/validation/formValidation';
import { Cargarubrosido } from '@modules/rubros/domain/model/Cargarubrosido';
import { useCargarubrosido } from './useCargarubrosido';
import { useRubrosCatalogs } from './useRubrosCatalogs';
import {
  CargaFilterState,
  UploadFormState,
  initialCargaFilters,
  initialUploadForm,
} from './cargarubrosidoPage.types';

export function useCargarubrosidoPageController() {
  const {
    items,
    lineas,
    loading,
    error,
    totalElements,
    page,
    fetchAll,
    fetchLineas,
    create,
    remove,
    aprobar,
    clearError,
  } = useCargarubrosido();
  const { items: empresas, loading: loadingEmpresas } = useEmpresas();
  const { rubros, loading: loadingCatalogs, error: catalogsError } = useRubrosCatalogs();
  const { validate, getError, hasError, clearErrors } = useFormValidation();
  const methods = useForm<UploadFormState>({
    defaultValues: initialUploadForm,
  });

  const [activeTab, setActiveTab] = useState<'cargas' | 'detalle'>('cargas');
  const [filters, setFilters] = useState<CargaFilterState>(initialCargaFilters);
  const [submittedFilters, setSubmittedFilters] = useState<CargaFilterState>(initialCargaFilters);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedCarga = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  const totalErrores = useMemo(
    () => items.reduce((acc, item) => acc + (item.numeroErrores ?? 0), 0),
    [items],
  );

  const totalRegistros = useMemo(
    () => items.reduce((acc, item) => acc + (item.numeroRegistros ?? 0), 0),
    [items],
  );

  useEffect(() => {
    void fetchAll({
      page,
      size: 10,
      empresaId: submittedFilters.empresaId ? Number(submittedFilters.empresaId) : undefined,
      rubroId: toOptionalString(submittedFilters.rubroId),
      estado: toOptionalString(submittedFilters.estado),
      sort: 'fechaCarga,desc',
    });
  }, [fetchAll, page, submittedFilters]);

  useEffect(() => {
    if (selectedCarga) {
      void fetchLineas(String(selectedCarga.id), 0, 10);
    }
  }, [fetchLineas, selectedCarga]);

  const handleFieldChange = <K extends keyof UploadFormState>(
    field: K,
    value: UploadFormState[K],
  ) => {
    if (field === 'archivo') {
      (methods.setValue as any)(field, value);
    } else {
      (methods.setValue as any)(field, value);
    }

    if (field === 'ambito' && value !== 'AP') {
      (methods.setValue as any)('tipoAP', '');
      (methods.setValue as any)('bancoId', '');
      (methods.setValue as any)('tipoCuenta', '');
      (methods.setValue as any)('tipoColaborador', '');
    }

    if (field === 'tipoAP' && value !== '1') {
      (methods.setValue as any)('bancoId', '');
      (methods.setValue as any)('tipoCuenta', '');
      (methods.setValue as any)('tipoColaborador', '');
    }

    if (field === 'bancoId' && value === '100') {
      (methods.setValue as any)('tipoCuenta', '3');
    }
  };

  const setFilterField = <K extends keyof CargaFilterState>(
    field: K,
    value: CargaFilterState[K],
  ) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const handleApplyFilters = () => {
    setSubmittedFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters(initialCargaFilters);
    setSubmittedFilters(initialCargaFilters);
  };

  const resetUploadForm = () => {
    methods.reset(initialUploadForm);
    clearErrors();
  };

  const handleSubmitUpload = async (formValues: UploadFormState) => {
    const result = validate(
      {
        empresaId: formValues.empresaId,
        fechaAplica: formValues.fechaAplica,
        archivo: formValues.archivo,
      },
      {
        empresaId: [required('Seleccione la empresa de la carga')],
        fechaAplica: [required('Seleccione la fecha de aplicación')],
        archivo: [required('Adjunte el archivo CSV a procesar')],
      },
    );

    if (!result.isValid || !formValues.archivo) {
      return;
    }

    await create({
      archivo: formValues.archivo,
      empresaId: Number(formValues.empresaId),
      rubroId: toOptionalString(formValues.rubroId),
      fechaAplica: formValues.fechaAplica,
      ambito: formValues.ambito,
      tipoAP: formValues.tipoAP ? Number(formValues.tipoAP) : undefined,
      bancoId: formValues.bancoId ? Number(formValues.bancoId) : undefined,
      tipoCuenta: toOptionalString(formValues.tipoCuenta),
      tipoColaborador: toOptionalString(formValues.tipoColaborador),
      periodoInicio: toOptionalString(formValues.periodoInicio),
      periodoFin: toOptionalString(formValues.periodoFin),
      descripcion: toOptionalString(formValues.descripcion),
      observaciones: toOptionalString(formValues.observaciones),
    });

    resetUploadForm();
    setActiveTab('cargas');
  };

  const handleApprove = async (itemId: number) => {
    if (!window.confirm('¿Desea aprobar la carga seleccionada?')) {
      return;
    }

    await aprobar(String(itemId));
    setSelectedId(itemId);
  };

  const handleDelete = async (itemId: number) => {
    if (!window.confirm('¿Desea eliminar la carga seleccionada?')) {
      return;
    }

    await remove(String(itemId));
    if (selectedId === itemId) {
      setSelectedId(null);
    }
  };

  const handleSelectCarga = (item: Cargarubrosido) => {
    setSelectedId(item.id);
    setActiveTab('detalle');
  };

  const handlePageChange = async (nextPage: number) => {
    await fetchAll({
      page: nextPage,
      size: 10,
      empresaId: submittedFilters.empresaId ? Number(submittedFilters.empresaId) : undefined,
      rubroId: toOptionalString(submittedFilters.rubroId),
      estado: toOptionalString(submittedFilters.estado),
    });
  };

  const handleRetry = async () => {
    clearError();
    await fetchAll({ page: 0, size: 10 });
  };

  return {
    items,
    lineas,
    loading,
    error,
    catalogsError,
    totalElements,
    page,
    empresas,
    rubros,
    loadingEmpresas,
    loadingCatalogs,
    activeTab,
    filters,
    methods,
    selectedCarga,
    totalErrores,
    totalRegistros,
    getError,
    hasError,
    setActiveTab,
    setFilterField,
    handleFieldChange,
    handleApplyFilters,
    handleResetFilters,
    resetUploadForm,
    handleSubmitUpload,
    handleApprove,
    handleDelete,
    handleSelectCarga,
    handlePageChange,
    handleRetry,
  };
}
