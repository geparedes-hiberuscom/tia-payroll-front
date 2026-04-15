export type AsignacionFormState = {
  rubroId: string;
  procesoId: string;
  secuencia: string;
  frecuenciaEjecucion: string;
  procedimientoCalculo: string;
  ambitoEjecucion: string;
  estado: string;
  activo: boolean;
  insertaEnLote: boolean;
  validaPlantillaContable: boolean;
};

export type AsignacionFilterState = {
  rubroId: string;
  procesoId: string;
};

export const initialForm: AsignacionFormState = {
  rubroId: '',
  procesoId: '',
  secuencia: '1',
  frecuenciaEjecucion: 'MENSUAL',
  procedimientoCalculo: '',
  ambitoEjecucion: 'NA',
  estado: 'ACTIVO',
  activo: true,
  insertaEnLote: false,
  validaPlantillaContable: false,
};

export const initialFilters: AsignacionFilterState = {
  rubroId: '',
  procesoId: '',
};
