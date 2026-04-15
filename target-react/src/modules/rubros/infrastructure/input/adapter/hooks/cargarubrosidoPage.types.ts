export type UploadFormState = {
  empresaId: string;
  rubroId: string;
  ambito: string;
  tipoAP: string;
  bancoId: string;
  tipoCuenta: string;
  tipoColaborador: string;
  fechaAplica: string;
  periodoInicio: string;
  periodoFin: string;
  descripcion: string;
  observaciones: string;
  archivo: File | null;
};

export type CargaFilterState = {
  empresaId: string;
  rubroId: string;
  estado: string;
};

export const initialUploadForm: UploadFormState = {
  empresaId: '',
  rubroId: '',
  ambito: 'IDO',
  tipoAP: '',
  bancoId: '',
  tipoCuenta: '',
  tipoColaborador: '',
  fechaAplica: '',
  periodoInicio: '',
  periodoFin: '',
  descripcion: '',
  observaciones: '',
  archivo: null,
};

export const initialCargaFilters: CargaFilterState = {
  empresaId: '',
  rubroId: '',
  estado: '',
};
