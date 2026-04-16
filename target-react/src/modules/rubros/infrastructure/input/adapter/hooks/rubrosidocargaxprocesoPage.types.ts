export type CargaProcesoFormState = {
  empresaId: string;
  procesoId: string;
  rubroId: string;
  ambito: string;
  accion: string;
  fechaAplica: string;
  descripcion: string;
};

export type CargaProcesoFilterState = {
  empresaId: string;
  rubroId: string;
  estado: string;
};

export const initialCargaProcesoForm: CargaProcesoFormState = {
  empresaId: '',
  procesoId: '',
  rubroId: '',
  ambito: 'IDO',
  accion: 'EJECUTAR',
  fechaAplica: '',
  descripcion: '',
};

export const initialCargaProcesoFilters: CargaProcesoFilterState = {
  empresaId: '',
  rubroId: '',
  estado: '',
};
