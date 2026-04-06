/**
 * Custom Hook para Tabla IR
 * Gestiona estado, loading, error y operaciones CRUD
 */

import { useCallback, useState } from 'react';
import { TablaIRService } from '../../../application/service/TablaIRService';
import { TablaIRGatewayAdapter } from '../../output/adapter/api/TablaIRGatewayAdapter';
import {
  CreateTablaIRRequest,
  UpdateTablaIRRequest,
  TablaIRResponse,
  TablaIRFilterParams,
  TablaIRPageResponse,
} from '../../input/adapter/dto/TablaIRDto';

// Instancia única del servicio (inyección manual)
const gateway = new TablaIRGatewayAdapter();
const service = new TablaIRService(gateway);

export function useTablaIR() {
  const [items, setItems] = useState<TablaIRResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<TablaIRResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchAll = useCallback(async (filters?: TablaIRFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.findAll(filters);
      setItems(response.content);
      setPagination({
        page: response.page,
        size: response.size,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tabla IR');
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
      setError(err instanceof Error ? err.message : 'Error al cargar rango IR');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateTablaIRRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(request);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear rango IR');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (id: number, request: UpdateTablaIRRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(id, request);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar rango IR');
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
        setError(err instanceof Error ? err.message : 'Error al eliminar rango IR');
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
    pagination,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
}
