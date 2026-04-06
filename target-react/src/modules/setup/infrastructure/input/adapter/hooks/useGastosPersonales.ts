/**
 * Custom Hook para Gastos Personales
 * Gestiona estado, loading, error y operaciones CRUD
 */

import { useCallback, useState } from 'react';
import { GastosPersonalesService } from '../../../application/service/GastosPersonalesService';
import { GastosPersonalesGatewayAdapter } from '../../output/adapter/api/GastosPersonalesGatewayAdapter';
import {
  CreateGastosPersonalesRequest,
  UpdateGastosPersonalesRequest,
  GastosPersonalesResponse,
  GastosPersonalesFilterParams,
  GastosPersonalesListResponse,
} from '../../input/adapter/dto/GastosPersonalesDto';

// Instancia única del servicio (inyección manual)
const gateway = new GastosPersonalesGatewayAdapter();
const service = new GastosPersonalesService(gateway);

export function useGastosPersonales() {
  const [items, setItems] = useState<GastosPersonalesResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<GastosPersonalesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchAll = useCallback(async (filters?: GastosPersonalesFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.findAll(filters);
      setItems(response.items);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar gastos personales');
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
      setError(err instanceof Error ? err.message : 'Error al cargar gasto personal');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateGastosPersonalesRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(request);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear gasto personal');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (id: number, request: UpdateGastosPersonalesRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(id, request);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar gasto personal');
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
        setError(err instanceof Error ? err.message : 'Error al eliminar gasto personal');
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
    update,
    remove,
  };
}
