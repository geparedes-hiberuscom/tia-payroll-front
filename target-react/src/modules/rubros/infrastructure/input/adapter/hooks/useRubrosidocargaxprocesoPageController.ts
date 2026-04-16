import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormValidation } from '@shared/infrastructure/input/adapter/hooks/useFormValidation';
import { required } from '@shared/infrastructure/input/adapter/validation/formValidation';
import { useRubrosCatalogs } from './useRubrosCatalogs';
import { useRubrosidocargaxproceso } from './useRubrosidocargaxproceso';
import {
  CargaProcesoFilterState,
  CargaProcesoFormState,
  initialCargaProcesoFilters,
  initialCargaProcesoForm,
} from './rubrosidocargaxprocesoPage.types';

export function useRubrosidocargaxprocesoPageController() {
  const {
    items,
    loading,
    error,
    fetchAll,
    clearError,
  } = useRubrosidocargaxproceso();
  const { procesos, error: catalogsError } = useRubrosCatalogs({ loadProcesos: true, loadRubros: false });
  const { validate, getError, hasError, clearErrors } = useFormValidation();
  const methods = useForm<CargaProcesoFormState>({
    defaultValues: initialCargaProcesoForm,
  });

  const [filters, setFilters] = useState<CargaProcesoFilterState>(initialCargaProcesoFilters);
  const [submittedFilters, setSubmittedFilters] = useState<CargaProcesoFilterState>(initialCargaProcesoFilters);

  useEffect(() => {
    void fetchAll({
      page: 0,
      size: 100,
    });
  }, [fetchAll]);

  const setFilterField = <K extends keyof CargaProcesoFilterState>(
    field: K,
    value: CargaProcesoFilterState[K],
  ) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const handleResetForm = useCallback(() => {
    methods.reset(initialCargaProcesoForm);
    clearErrors();
  }, [methods, clearErrors]);

  const handleSearch = useCallback(async (formValues: CargaProcesoFormState) => {
    // Validar proceso, año y mes (numéricos)
    const result = validate(
      {
        procesoId: formValues.procesoId,
        anio: formValues.anio,
        mes: formValues.mes,
      },
      {
        procesoId: [required('Seleccione el proceso de nómina')],
        anio: [required('Seleccione el año')],
        mes: [required('Seleccione el mes')],
      },
    );

    if (!result.isValid) {
      return;
    }

    // Validar año y mes sean numéricos válidos
    const year = Number(formValues.anio);
    const month = Number(formValues.mes);

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      console.error('Año o mes inválidos');
      return;
    }

    // Aquí iría la lógica de búsqueda de rubros cargados por proceso
    // Por ahora solo se registra el intento de búsqueda
    console.log('Búsqueda de rubros:', {
      procesoId: formValues.procesoId,
      año: year,
      mes: month,
    });
  }, [validate]);

  const handleRetry = useCallback(async () => {
    clearError();
    await fetchAll({ page: 0, size: 100 });
  }, [clearError, fetchAll]);

  return useMemo(() => ({
    items,
    loading,
    error,
    catalogsError,
    procesos,
    methods,
    filters,
    submittedFilters,
    getError,
    hasError,
    setFilterField,
    handleSearch,
    handleResetForm,
    handleRetry,
  }), [
    items,
    loading,
    error,
    catalogsError,
    procesos,
    methods,
    filters,
    submittedFilters,
    getError,
    hasError,
    setFilterField,
    handleSearch,
    handleResetForm,
    handleRetry,
  ]);
}
