import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { parseNumber, toOptionalString } from '@shared/index';
import { useFormValidation } from '@shared/infrastructure/input/adapter/hooks/useFormValidation';
import { required } from '@shared/infrastructure/input/adapter/validation/formValidation';
import { Rubrosxprocesodialog } from '@modules/rubros/domain/model/Rubrosxprocesodialog';
import { useRubrosCatalogs } from './useRubrosCatalogs';
import { useRubrosxprocesodialog } from './useRubrosxprocesodialog';
import { AsignacionFilterState, AsignacionFormState, initialFilters, initialForm } from './rubrosxprocesodialogPage.types';

interface RubrosxprocesodialogPageControllerOptions {
  fixedProcesoId?: number | null;
}

export function useRubrosxprocesodialogPageController(options?: RubrosxprocesodialogPageControllerOptions) {
  const fixedProcesoId = options?.fixedProcesoId ?? null;
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
  } = useRubrosxprocesodialog();
  const { rubros, procesos, error: catalogsError } = useRubrosCatalogs({ loadProcesos: true });
  const methods = useForm<AsignacionFormState>({
    defaultValues: initialForm,
  });
  const { validate, getError, hasError, clearErrors } = useFormValidation();

  const [filters, setFilters] = useState<AsignacionFilterState>({
    ...initialFilters,
    procesoId: fixedProcesoId ? String(fixedProcesoId) : initialFilters.procesoId,
  });
  const [submittedFilters, setSubmittedFilters] = useState<AsignacionFilterState>({
    ...initialFilters,
    procesoId: fixedProcesoId ? String(fixedProcesoId) : initialFilters.procesoId,
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId],
  );

  const buildFilterPayload = (targetPage: number, source: AsignacionFilterState) => ({
    page: targetPage,
    size: 10,
    rubroId: toOptionalString(source.rubroId),
    procesoId: fixedProcesoId ?? parseNumber(source.procesoId),
  });

  useEffect(() => {
    void fetchAll(buildFilterPayload(page, submittedFilters));
  }, [fetchAll, page, submittedFilters, fixedProcesoId]);

  useEffect(() => {
    if (!fixedProcesoId) {
      return;
    }

    const fixedProcesoAsString = String(fixedProcesoId);
    methods.setValue('procesoId', fixedProcesoAsString);
    setFilters((current) => ({ ...current, procesoId: fixedProcesoAsString }));
    setSubmittedFilters((current) => ({ ...current, procesoId: fixedProcesoAsString }));
  }, [fixedProcesoId, methods]);

  const setFilterField = <K extends keyof AsignacionFilterState>(
    field: K,
    value: AsignacionFilterState[K],
  ) => {
    setFilters((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    methods.reset({
      ...initialForm,
      procesoId: fixedProcesoId ? String(fixedProcesoId) : initialForm.procesoId,
    });
    setSelectedId(null);
    clearErrors();
  };

  const applyFilters = () => {
    setSubmittedFilters((current) => ({
      ...filters,
      procesoId: fixedProcesoId ? String(fixedProcesoId) : current.procesoId || filters.procesoId,
    }));
  };

  const resetFilters = () => {
    const nextFilters = {
      ...initialFilters,
      procesoId: fixedProcesoId ? String(fixedProcesoId) : initialFilters.procesoId,
    };
    setFilters(nextFilters);
    setSubmittedFilters(nextFilters);
  };

  const handleSave = async (formValues: AsignacionFormState) => {
    const procesoId = fixedProcesoId ? String(fixedProcesoId) : formValues.procesoId;

    const result = validate(
      { rubroId: formValues.rubroId, procesoId },
      {
        rubroId: [required('Seleccione el rubro a asociar')],
        procesoId: [required('Seleccione el proceso padre')],
      },
    );

    if (!result.isValid) {
      return;
    }

    const payload = {
      rubroId: formValues.rubroId,
      procesoId: Number(procesoId),
      secuencia: parseNumber(formValues.secuencia),
      frecuenciaEjecucion: toOptionalString(formValues.frecuenciaEjecucion),
      procedimientoCalculo: toOptionalString(formValues.procedimientoCalculo),
      ambitoEjecucion: toOptionalString(formValues.ambitoEjecucion),
      insertaEnLote: formValues.insertaEnLote ? 'S' : 'N',
      validaPlantillaContable: formValues.validaPlantillaContable ? 'S' : 'N',
      estado: formValues.estado,
      activo: formValues.activo,
    };

    if (selectedItem) {
      await update(selectedItem.id, payload);
    } else {
      await create(payload);
    }

    resetForm();
  };

  const loadItemIntoForm = (item: Rubrosxprocesodialog) => {
    setSelectedId(item.id);
    clearErrors();
    methods.reset({
      rubroId: item.rubroId,
      procesoId: String(item.procesoId),
      secuencia: String(item.secuencia ?? 1),
      frecuenciaEjecucion: item.frecuenciaEjecucion ?? 'MENSUAL',
      procedimientoCalculo: item.procedimientoCalculo ?? '',
      ambitoEjecucion: item.ambitoEjecucion ?? 'NA',
      estado: item.estado ?? 'ACTIVO',
      activo: item.activo ?? true,
      insertaEnLote: item.insertaEnLote === 'S',
      validaPlantillaContable: item.validaPlantillaContable === 'S',
    });
  };

  const handleEditSelected = () => {
    if (!selectedItem) {
      return;
    }

    loadItemIntoForm(selectedItem);
  };

  const handleDelete = async (itemId: number) => {
    if (!window.confirm('¿Eliminar la asignación rubro-proceso seleccionada?')) {
      return;
    }

    await remove(itemId);
    if (selectedId === itemId) {
      resetForm();
    }
  };

  const handlePageChange = async (nextPage: number) => {
    await fetchAll(buildFilterPayload(nextPage, submittedFilters));
  };

  const handleRetry = async () => {
    clearError();
    await fetchAll(buildFilterPayload(0, submittedFilters));
  };

  return {
    items,
    loading,
    error,
    catalogsError,
    rubros,
    procesos,
    methods,
    filters,
    selectedItem,
    totalElements,
    page,
    hasError,
    getError,
    setSelectedId,
    setFilterField,
    applyFilters,
    resetFilters,
    resetForm,
    handleSave,
    handleEditSelected,
    loadItemIntoForm,
    handleDelete,
    handlePageChange,
    handleRetry,
    fixedProcesoId,
  };
}
