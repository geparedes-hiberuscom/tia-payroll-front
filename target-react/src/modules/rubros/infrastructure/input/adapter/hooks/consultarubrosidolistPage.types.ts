export type ConsultaFilterState = {
  empresaId: string;
  localidadId: string;
  rubroId: string;
  colaboradorId: string;
  fecha: string;
};

export const initialConsultaFilters: ConsultaFilterState = {
  empresaId: '',
  localidadId: '',
  rubroId: '',
  colaboradorId: '',
  fecha: '',
};

export const estadoOptions = ['ACTIVO', 'INACTIVO', 'APROBADO', 'ANULADO', 'ENVIADO'];
