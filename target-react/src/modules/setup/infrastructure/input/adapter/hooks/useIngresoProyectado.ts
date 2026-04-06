/**
 * Custom Hook para Ingresos Proyectados
 * Gestiona estado, loading, error y operaciones CRUD
 */

import { useCallback, useState } from 'react';
import { IngresoProyectadoService } from '../../../application/service/IngresoProyectadoService';
import { IngresoProyectadoGatewayAdapter } from '../../output/adapter/api/IngresoProyectadoGatewayAdapter';
import {
  CreateIngresoProyectadoRequest,
  UpdateIngresoProyectadoRequest,
  GenerarIngresosProyectadosRequest,
  IngresoProyectadoResponse,
  IngresoProyectadoFilterParams,
  ProcesoResponse,
} from '../../input/adapter/dto/IngresoProyectadoDto';

// Instancia única del servicio (inyección manual)
const gateway = new IngresoProyectadoGatewayAdapter();
const service = new IngresoProyectadoService(gateway);

export function useIngresoProyectado() {
  const [items, setItems] = useState<IngresoProyectadoResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<IngresoProyectadoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchAll = useCallback(async (filters?: IngresoProyectadoFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.findAll(filters);
      setItems(response.items);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar ingresos proyectados');
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
      setError(err instanceof Error ? err.message : 'Error al cargar ingreso proyectado');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateIngresoProyectadoRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(request);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear ingreso proyectado');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const generar = useCallback(async (request: GenerarIngresosProyectadosRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.generar(request);
      await fetchAll();
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar ingresos proyectados');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (id: number, request: UpdateIngresoProyectadoRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(id, request);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar ingreso proyectado');
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
        setError(err instanceof Error ? err.message : 'Error al eliminar ingreso proyectado');
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
