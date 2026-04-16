import { useState, useEffect, useCallback } from 'react';
import { RubrosidomainApplicationService } from '@modules/rubros/application/service/RubrosidomainApplicationService';
import { RubrosidomainGatewayAdapter } from '@modules/rubros/infrastructure/output/adapter/api/RubrosidomainGatewayAdapter';
import { Rubrosidomain, CreateRubrosidomain, UpdateRubrosidomain, RubrosidomainFilter } from '@modules/rubros/domain/model/Rubrosidomain';

// ─── Inyección manual: Gateway Adapter → Application Service ───
const gatewayAdapter = new RubrosidomainGatewayAdapter();
const rubrosidomainService = new RubrosidomainApplicationService(gatewayAdapter);

/**
 * Custom Hook: useRubrosidomain
 * Conecta la UI con el Application Service de rubrosIDOMain.zul / rubrosIDOList.zul / rubrosIDODetail.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useRubrosidomain(autoLoad = true ) {
  const [items, setItems] = useState<Rubrosidomain[]>([]);
  const [selectedItem, setSelectedItem] = useState<Rubrosidomain | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: RubrosidomainFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rubrosidomainService.findAll(params);
      setItems(response.items);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setPage(response.currentPage || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      const item = await rubrosidomainService.findById(String(id));
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateRubrosidomain) => {
    try {
      setLoading(true);
      setError(null);
      const created = await rubrosidomainService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string | number, request: UpdateRubrosidomain) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await rubrosidomainService.update(String(id), request);
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
      await rubrosidomainService.remove(String(id));
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
    if (autoLoad) {
      fetchAll();
    }
  }, [fetchAll, autoLoad]);

  return {
    items,
    selectedItem,
    loading,
    error,
    totalElements,
    totalPages,
    page,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
    clearError: () => setError(null),
  };
}
