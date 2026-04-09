import { useState, useEffect, useCallback } from 'react';
import { RubrosidocargaxprocesoApplicationService } from '@modules/rubros/application/service/RubrosidocargaxprocesoApplicationService';
import { RubrosidocargaxprocesoGatewayAdapter } from '@modules/rubros/infrastructure/output/adapter/api/RubrosidocargaxprocesoGatewayAdapter';
import { Rubrosidocargaxproceso, CreateRubrosidocargaxproceso, UpdateRubrosidocargaxproceso, RubrosidocargaxprocesoFilter } from '@modules/rubros/domain/model/Rubrosidocargaxproceso';

// ─── Inyección manual: Gateway Adapter → Application Service ───
const gatewayAdapter = new RubrosidocargaxprocesoGatewayAdapter();
const rubrosidocargaxprocesoService = new RubrosidocargaxprocesoApplicationService(gatewayAdapter);

/**
 * Custom Hook: useRubrosidocargaxproceso
 * Conecta la UI con el Application Service de rubrosIDOcargaxProceso.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useRubrosidocargaxproceso() {
  const [items, setItems] = useState<Rubrosidocargaxproceso[]>([]);
  const [selectedItem, setSelectedItem] = useState<Rubrosidocargaxproceso | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: RubrosidocargaxprocesoFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rubrosidocargaxprocesoService.findAll(params);
      setItems(response.items);
      setTotalElements(response.totalElements);
      setPage(response.currentPage || 0);
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
      const item = await rubrosidocargaxprocesoService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateRubrosidocargaxproceso) => {
    try {
      setLoading(true);
      setError(null);
      const created = await rubrosidocargaxprocesoService.create(request);
      if ('id' in created) {
        setItems(prev => [...prev, created]);
      }
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string | number, request: UpdateRubrosidocargaxproceso) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await rubrosidocargaxprocesoService.update(String(id), request);
      setItems(prev => prev.map(item => item.id === Number(id) ? updated : item));
      if (selectedItem?.id === Number(id)) {
        setSelectedItem(updated);
      }
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      await rubrosidocargaxprocesoService.remove(String(id));
      setItems(prev => prev.filter(item => item.id !== Number(id)));
      if (selectedItem?.id === Number(id)) {
        setSelectedItem(null);
      }
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
