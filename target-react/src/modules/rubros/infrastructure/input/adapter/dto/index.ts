// DTO barrel — named re-exports to avoid TS2308 collision on shared types
// (DeleteResponseDTO, ProcesoResponseDTO, RubroIDOResponseDTO are duplicated across DTOs).

export type {
  CreateCargarubrosidoRequest, UpdateCargarubrosidoRequest, CargarubrosidoFilterParams,
  CargarubrosidoResponse, CargarubrosidoLineaResponse,
  CargarubrosidoListResponse, CargarubrosidoLineaListResponse,
} from './CargarubrosidoDto';

export type {
  CreateConsultarubrosidolistRequest, UpdateConsultarubrosidolistRequest,
  ExportarConsultaIDORequest, CambiarEstadoIDORequest, ConsultarubrosidolistFilterParams,
  ConsultarubrosidolistResponse, ConsultarubrosidolistListResponse, ExportarResponseDTO,
} from './ConsultarubrosidolistDto';

export type {
  RubrosRequest, RubrosResponse,
} from './RubrosDto';

export type {
  CreateRubrosRubrosdialogRequest, UpdateRubrosRubrosdialogRequest, RubrosRubrosdialogFilterParams,
  RubrosRubrosdialogResponse, RubrosRubrosdialogListResponse,
} from './RubrosRubrosdialogDto';

export type {
  CreateRubrosidocargaxprocesoRequest, UpdateRubrosidocargaxprocesoRequest, RubrosidocargaxprocesoFilterParams,
  RubrosidocargaxprocesoResponse, RubrosidocargaxprocesoListResponse,
} from './RubrosidocargaxprocesoDto';

export type {
  CreateRubrosidomainRubrosidolistRubrosidodetailRequest, UpdateRubrosidomainRubrosidolistRubrosidodetailRequest,
  RubrosidomainRubrosidolistRubrosidodetailFilterParams,
  RubrosidomainRubrosidolistRubrosidodetailResponse, RubrosidomainRubrosidolistRubrosidodetailListResponse,
} from './RubrosidomainRubrosidolistRubrosidodetailDto';

export type {
  CreateRubrosxprocesodialogRequest, UpdateRubrosxprocesodialogRequest, RubrosxprocesodialogFilterParams,
  RubrosxprocesodialogResponse, RubrosxprocesodialogListResponse,
} from './RubrosxprocesodialogDto';
