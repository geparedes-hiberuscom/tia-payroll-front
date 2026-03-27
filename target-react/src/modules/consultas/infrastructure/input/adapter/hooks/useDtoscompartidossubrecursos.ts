import { useState, useEffect, useCallback } from 'react';
import { DtoscompartidossubrecursosService } from '../../../../application/service/DtoscompartidossubrecursosService';
import { DtoscompartidossubrecursosGatewayAdapter } from '../../../output/adapter/api/DtoscompartidossubrecursosGatewayAdapter';
import { DtoscompartidossubrecursosResponse, CreateDtoscompartidossubrecursosRequest, UpdateDtoscompartidossubrecursosRequest, DtoscompartidossubrecursosFilterParams } from '../dto/DtoscompartidossubrecursosDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new DtoscompartidossubrecursosGatewayAdapter();
const dtoscompartidossubrecursosService = new DtoscompartidossubrecursosService(gatewayAdapter);

/**
 * Custom Hook: useDtoscompartidossubrecursos
 * Conecta la UI con el Application Service de DTOs compartidos (subrecursos).
 * Maneja estado de carga, errores y datos.
 */
export function useDtoscompartidossubrecursos() {
  const [items, setItems] = useState<DtoscompartidossubrecursosResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<DtoscompartidossubrecursosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: DtoscompartidossubrecursosFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dtoscompartidossubrecursosService.findAll(params);
      setItems(response.data);
      setTotalElements(response.totalElements);
      setPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const item = await dtoscompartidossubrecursosService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateDtoscompartidossubrecursosRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await dtoscompartidossubrecursosService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateDtoscompartidossubrecursosRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await dtoscompartidossubrecursosService.update(id, request);
      setItems(prev => prev.map(item => item.id === id ? updated : item));
      setSelectedItem(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await dtoscompartidossubrecursosService.remove(id);
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedItem?.id === id) { setSelectedItem(null); }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedItem]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    items,
    selectedItem,
    loading,
    error,
    totalElements,
    page,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    clearError: () => setError(null),
  };
}
