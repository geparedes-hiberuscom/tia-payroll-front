import { useState, useCallback } from 'react';
import {
  FormState,
  CatalogState,
  ConditionalVisibility,
  DEFAULT_FORM_STATE,
  DEFAULT_CATALOGS,
  MOCK_EMPRESAS,
  MOCK_TIPOS_AP,
  MOCK_BANCOS,
  MOCK_TIPOS_CTA,
  MOCK_TIPOS_COLABORADOR,
} from '../config/CargarubrosidoFormTypes';

export const useCargarubrosidoForm = () => {
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM_STATE);
  const [catalogs, setCatalogs] = useState<CatalogState>(DEFAULT_CATALOGS);
  const [visibility, setVisibility] = useState<ConditionalVisibility>({
    showAPFields: false,
    showBancoFields: false,
  });

  // Inicializar catálogos
  const initializeCatalogs = useCallback(() => {
    setCatalogs({
      empresas: MOCK_EMPRESAS,
      tiposAP: [],
      bancos: [],
      tiposCta: [],
      tiposColaborador: [],
    });
  }, []);

  // Manejar cambio de Ámbito
  const handleAmbitoChange = useCallback((value: 'IDO' | 'PTM' | 'AP' | '') => {
    setFormState(prev => ({
      ...prev,
      vidambito: value,
      tipoAP: '',
      iidBanco: '',
      vidTipoCta: '',
      viTipoColaborador: '',
    }));

    if (value === 'AP') {
      setVisibility({ showAPFields: true, showBancoFields: false });
      setCatalogs(prev => ({
        ...prev,
        tiposAP: MOCK_TIPOS_AP,
      }));
    } else {
      setVisibility({ showAPFields: false, showBancoFields: false });
    }
  }, []);

  // Manejar cambio de Tipo AP
  const handleTipoAPChange = useCallback((tipoId: number | '') => {
    setFormState(prev => ({
      ...prev,
      tipoAP: tipoId,
      iidBanco: '',
      vidTipoCta: '',
      viTipoColaborador: '',
    }));

    // Si es "Actualización de Datos de Rol" (id 1), mostrar campos de banco
    if (tipoId === 1) {
      setVisibility(prev => ({ ...prev, showBancoFields: true }));
      setCatalogs(prev => ({
        ...prev,
        bancos: MOCK_BANCOS,
      }));
    } else {
      setVisibility(prev => ({ ...prev, showBancoFields: false }));
    }
  }, []);

  // Manejar cambio de Banco
  const handleBancoChange = useCallback((bancoId: number | '') => {
    setFormState(prev => ({
      ...prev,
      iidBanco: bancoId,
      vidTipoCta: bancoId === 100 ? '3' : '', // EFE fija tipo 3
    }));

    if (bancoId === 100) {
      // Efectivo: deshabilitar tipo de cuenta
      setCatalogs(prev => ({
        ...prev,
        tiposCta: [],
      }));
    } else if (bancoId) {
      // Otros bancos: cargar tipos de cuenta
      setCatalogs(prev => ({
        ...prev,
        tiposCta: MOCK_TIPOS_CTA,
        tiposColaborador: MOCK_TIPOS_COLABORADOR,
      }));
    }
  }, []);

  // Manejar cambio de archivo
  const handleFileChange = useCallback((file: File | null) => {
    setFormState(prev => ({
      ...prev,
      archivo: file,
    }));
  }, []);

  // Actualizar campo del formulario
  const updateFormField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormState(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Resetear formulario
  const resetForm = useCallback(() => {
    setFormState(DEFAULT_FORM_STATE);
    setVisibility({ showAPFields: false, showBancoFields: false });
  }, []);

  // Validar formulario
  const validateForm = useCallback((): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!formState.iidempresa) {
      errors.push('Por favor seleccione una empresa');
    }
    if (!formState.vidambito) {
      errors.push('Por favor seleccione un ámbito');
    }
    if (!formState.archivo) {
      errors.push('Por favor seleccione un archivo');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [formState]);

  // Preparar FormData para envío
  const prepareFormData = useCallback((): FormData => {
    const data = new FormData();
    
    if (formState.archivo) {
      data.append('file', formState.archivo);
    }
    data.append('iidempresa', String(formState.iidempresa));
    data.append('vidambito', String(formState.vidambito));
    data.append('vidrubro', formState.vidrubro);
    data.append('dfechaaplica', formState.dfechaaplica);
    data.append('vObservaciones', formState.vObservaciones);
    
    if (formState.tipoAP) {
      data.append('tipoAP', String(formState.tipoAP));
    }
    if (formState.iidBanco) {
      data.append('iidBanco', String(formState.iidBanco));
    }
    if (formState.vidTipoCta) {
      data.append('vidTipoCta', formState.vidTipoCta);
    }
    if (formState.viTipoColaborador) {
      data.append('viTipoColaborador', formState.viTipoColaborador);
    }

    return data;
  }, [formState]);

  return {
    // Estados
    formState,
    catalogs,
    visibility,

    // Inicializadores
    initializeCatalogs,

    // Handlers
    handleAmbitoChange,
    handleTipoAPChange,
    handleBancoChange,
    handleFileChange,
    updateFormField,
    resetForm,

    // Validación y preparación
    validateForm,
    prepareFormData,
  };
};
