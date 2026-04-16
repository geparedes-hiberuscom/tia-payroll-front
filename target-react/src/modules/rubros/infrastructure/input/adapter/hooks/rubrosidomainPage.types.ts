export type RubroIDOFormState = {
  empresaId: string;
  rubroId: string;
  colaboradorId: string;
  tipoComportamiento: string;
  valor01: string;
  valor02: string;
  estado: string;
  fechaDesde: string;
  fechaHasta: string;
};

export type RubroIDOFilterState = {
  empresaId: string;
  rubroId: string;
  colaboradorId: string;
  estado: string;
  fechaDesde: string;
  fechaHasta: string;
};

export const initialRubroIDOForm: RubroIDOFormState = {
  empresaId: '',
  rubroId: '',
  colaboradorId: '',
  tipoComportamiento: '1',
  valor01: '',
  valor02: '',
  estado: 'ACTIVO',
  fechaDesde: '',
  fechaHasta: '',
};

export const initialRubroIDOFilters: RubroIDOFilterState = {
  empresaId: '',
  rubroId: '',
  colaboradorId: '',
  estado: '',
  fechaDesde: '',
  fechaHasta: '',
};
