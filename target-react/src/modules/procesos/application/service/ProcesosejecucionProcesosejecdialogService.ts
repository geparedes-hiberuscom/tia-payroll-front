import { ProcesosejecucionProcesosejecdialogGatewayPort } from '../port/output/ProcesosejecucionProcesosejecdialogGatewayPort';
import { CreateProcesosejecucionProcesosejecdialogRequest, EjecutarCalculoRequest, EjecucionResultadoResponse, ProcesosejecucionProcesosejecdialogFilterParams, ProcesosejecucionProcesosejecdialogListResponse, ProcesosejecucionProcesosejecdialogResponse, UpdateProcesosejecucionProcesosejecdialogRequest } from '../../infrastructure/input/adapter/dto/ProcesosejecucionProcesosejecdialogDto';
export class ProcesosejecucionProcesosejecdialogService {
constructor(private readonly gateway: ProcesosejecucionProcesosejecdialogGatewayPort) {}
async findById(id: string): Promise<ProcesosejecucionProcesosejecdialogResponse> { if (!id.trim()) throw new Error('id es requerido'); return this.gateway.findById(id);}
async findAll(params?: ProcesosejecucionProcesosejecdialogFilterParams): Promise<ProcesosejecucionProcesosejecdialogListResponse> { return this.gateway.findAll(params);}
async create(request: CreateProcesosejecucionProcesosejecdialogRequest): Promise<ProcesosejecucionProcesosejecdialogResponse> { if (!request.procesoId) throw new Error('procesoId es requerido'); return this.gateway.create(request);}
async update(id: string, request: UpdateProcesosejecucionProcesosejecdialogRequest): Promise<ProcesosejecucionProcesosejecdialogResponse> { if (!id.trim()) throw new Error('id es requerido'); return this.gateway.update(id, request);}
async remove(id: string): Promise<void> { await this.gateway.remove(id);}
async ejecutar(id: string, request: EjecutarCalculoRequest): Promise<EjecucionResultadoResponse> { if (!id.trim()) throw new Error('id es requerido'); if (request.entornoEjecucionId !== undefined && request.entornoEjecucionId <= 0) throw new Error('entornoEjecucionId invalido'); return this.gateway.ejecutar(id, request);}
}
