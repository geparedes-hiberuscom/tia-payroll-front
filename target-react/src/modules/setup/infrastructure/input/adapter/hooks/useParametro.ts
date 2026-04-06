/**
 * Custom Hook para Parámetros
 * Gestiona estado, loading, error y operaciones CRUD
 */

import { useCallback, useState } from 'react';
import { ParametroService } from '../../../application/service/ParametroService';
import { ParametroGatewayAdapter } from '../../output/adapter/api/ParametroGatewayAdapter';
import {
  CreateParametroRequest,
  UpdateParametroRequest,
  ParametroResponse,
  ParametroFilterParams,
  ParametroPageResponse,
} from '../../input/adapter/dto/ParametroDto';

// Instancia única del servicio (inyección manual)
const gateway = new ParametroGatewayAdapter();
const service = new ParametroService(gateway);

export function useParametro() {
  const [items, setItems] = useState<ParametroResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ParametroResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchAll = useCallback(async (filters?: ParametroFilterParams) => {
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
      setError(err instanceof Error ? err.message : 'Error al cargar parámetros');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (entorno: string, idParametro: string) => {
    try {
      setLoading(true);
      setError(null);
      const item = await service.findById(entorno, idParametro);
      setSelectedItem(item);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar parámetro');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateParametroRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(request);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear parámetro');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (entorno: string, idParametro: string, request: UpdateParametroRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(entorno, idParametro, request);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar parámetro');
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  const remove = useCallback(
    async (entorno: string, idParametro: string) => {
      try {
        setLoading(true);
        setError(null);
        await service.remove(entorno, idParametro);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar parámetro');
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
