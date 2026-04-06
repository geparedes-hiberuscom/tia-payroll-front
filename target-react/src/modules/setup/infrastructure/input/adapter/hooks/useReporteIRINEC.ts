/**
 * Custom Hook para Reportes IR/INEC
 * Gestiona estado, loading, error y operaciones CRUD
 */

import { useCallback, useState } from 'react';
import { ReporteIRINECService } from '../../../application/service/ReporteIRINECService';
import { ReporteIRINECGatewayAdapter } from '../../output/adapter/api/ReporteIRINECGatewayAdapter';
import {
  CreateReporteIRINECRequest,
  UpdateReporteIRINECRequest,
  GenerarReporteIRINECRequest,
  ReporteIRINECResponse,
  ReporteIRINECFilterParams,
  ProcesoResponse,
} from '../../input/adapter/dto/ReporteIRINECDto';

// Instancia única del servicio (inyección manual)
const gateway = new ReporteIRINECGatewayAdapter();
const service = new ReporteIRINECService(gateway);

export function useReporteIRINEC() {
  const [items, setItems] = useState<ReporteIRINECResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ReporteIRINECResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchAll = useCallback(async (filters?: ReporteIRINECFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.findAll(filters);
      setItems(response.items);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar reportes IR/INEC');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const item = await service.findById(id);
      setSelectedItem(item);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar reporte IR/INEC');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateReporteIRINECRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(request);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear reporte IR/INEC');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const generar = useCallback(async (request: GenerarReporteIRINECRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.generar(request);
      await fetchAll();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar reporte IR/INEC');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (id: number, request: UpdateReporteIRINECRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(id, request);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar reporte IR/INEC');
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  const remove = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);
        await service.remove(id);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar reporte IR/INEC');
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  return {
    items,
    selectedItem,
    loading,
    error,
    total,
    fetchAll,
    fetchById,
    create,
    generar,
    update,
    remove,
  };
}
