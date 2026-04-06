import { useState, useEffect, useCallback } from 'react';
import { GeningproyectadosService } from '../../../../application/service/GeningproyectadosService';
import { GeningproyectadosGatewayAdapter } from '../../../output/adapter/api/GeningproyectadosGatewayAdapter';
import { GeningproyectadosResponse, CreateGeningproyectadosRequest, UpdateGeningproyectadosRequest, GeningproyectadosFilterParams } from '../dto/GeningproyectadosDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new GeningproyectadosGatewayAdapter();
const geningproyectadosService = new GeningproyectadosService(gatewayAdapter);

/**
 * Custom Hook: useGeningproyectados
 * Conecta la UI con el Application Service de genIngProyectados.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useGeningproyectados() {
  const [items, setItems] = useState<GeningproyectadosResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<GeningproyectadosResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: GeningproyectadosFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await geningproyectadosService.findAll(params);
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
      const item = await geningproyectadosService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateGeningproyectadosRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await geningproyectadosService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateGeningproyectadosRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await geningproyectadosService.update(id, request);
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
      await geningproyectadosService.remove(id);
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
