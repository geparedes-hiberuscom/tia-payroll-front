import { useState, useEffect, useCallback } from 'react';
import { GastospersonalesdialogService } from '../../../../application/service/GastospersonalesdialogService';
import { GastospersonalesdialogGatewayAdapter } from '../../../output/adapter/api/GastospersonalesdialogGatewayAdapter';
import { GastospersonalesdialogResponse, CreateGastospersonalesdialogRequest, UpdateGastospersonalesdialogRequest, GastospersonalesdialogFilterParams } from '../dto/GastospersonalesdialogDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new GastospersonalesdialogGatewayAdapter();
const gastospersonalesdialogService = new GastospersonalesdialogService(gatewayAdapter);

/**
 * Custom Hook: useGastospersonalesdialog
 * Conecta la UI con el Application Service de GastosPersonalesDialog.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useGastospersonalesdialog() {
  const [items, setItems] = useState<GastospersonalesdialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<GastospersonalesdialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: GastospersonalesdialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await gastospersonalesdialogService.findAll(params);
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
      const item = await gastospersonalesdialogService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateGastospersonalesdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await gastospersonalesdialogService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateGastospersonalesdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await gastospersonalesdialogService.update(id, request);
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
      await gastospersonalesdialogService.remove(id);
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
