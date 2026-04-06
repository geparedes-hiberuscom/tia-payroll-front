import { useState, useEffect, useCallback } from 'react';
import { PlantillacontablePlantillacontabledialogService } from '../../../../application/service/PlantillacontablePlantillacontabledialogService';
import { PlantillacontablePlantillacontabledialogGatewayAdapter } from '../../../output/adapter/api/PlantillacontablePlantillacontabledialogGatewayAdapter';
import { PlantillacontablePlantillacontabledialogResponse, CreatePlantillacontablePlantillacontabledialogRequest, UpdatePlantillacontablePlantillacontabledialogRequest, PlantillacontablePlantillacontabledialogFilterParams } from '../dto/PlantillacontablePlantillacontabledialogDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new PlantillacontablePlantillacontabledialogGatewayAdapter();
const plantillacontablePlantillacontabledialogService = new PlantillacontablePlantillacontabledialogService(gatewayAdapter);

/**
 * Custom Hook: usePlantillacontablePlantillacontabledialog
 * Conecta la UI con el Application Service de plantillaContable.zul / plantillaContableDialog.zul.
 * Maneja estado de carga, errores y datos.
 */
export function usePlantillacontablePlantillacontabledialog() {
  const [items, setItems] = useState<PlantillacontablePlantillacontabledialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<PlantillacontablePlantillacontabledialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: PlantillacontablePlantillacontabledialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await plantillacontablePlantillacontabledialogService.findAll(params);
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
      const item = await plantillacontablePlantillacontabledialogService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreatePlantillacontablePlantillacontabledialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await plantillacontablePlantillacontabledialogService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdatePlantillacontablePlantillacontabledialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await plantillacontablePlantillacontabledialogService.update(id, request);
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
      await plantillacontablePlantillacontabledialogService.remove(id);
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
