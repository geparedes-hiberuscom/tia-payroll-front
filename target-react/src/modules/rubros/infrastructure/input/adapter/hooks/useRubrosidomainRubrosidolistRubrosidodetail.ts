import { useState, useEffect, useCallback } from 'react';
import { RubrosidomainRubrosidolistRubrosidodetailService } from '@modules/rubros/application/service/RubrosidomainRubrosidolistRubrosidodetailService';
import { RubrosidomainRubrosidolistRubrosidodetailGatewayAdapter } from '@modules/rubros/infrastructure/output/adapter/api/RubrosidomainRubrosidolistRubrosidodetailGatewayAdapter';
import { RubrosidomainRubrosidolistRubrosidodetailResponse, CreateRubrosidomainRubrosidolistRubrosidodetailRequest, UpdateRubrosidomainRubrosidolistRubrosidodetailRequest, RubrosidomainRubrosidolistRubrosidodetailFilterParams } from '../dto/RubrosidomainRubrosidolistRubrosidodetailDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new RubrosidomainRubrosidolistRubrosidodetailGatewayAdapter();
const rubrosidomainRubrosidolistRubrosidodetailService = new RubrosidomainRubrosidolistRubrosidodetailService(gatewayAdapter);

/**
 * Custom Hook: useRubrosidomainRubrosidolistRubrosidodetail
 * Conecta la UI con el Application Service de rubrosIDOMain.zul / rubrosIDOList.zul / rubrosIDODetail.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useRubrosidomainRubrosidolistRubrosidodetail() {
  const [items, setItems] = useState<RubrosidomainRubrosidolistRubrosidodetailResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<RubrosidomainRubrosidolistRubrosidodetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: RubrosidomainRubrosidolistRubrosidodetailFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await rubrosidomainRubrosidolistRubrosidodetailService.findAll(params);
      setItems(response.content);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setPage(response.number || 0);
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
      const item = await rubrosidomainRubrosidolistRubrosidodetailService.findById(String(id));
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateRubrosidomainRubrosidolistRubrosidodetailRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await rubrosidomainRubrosidolistRubrosidodetailService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string | number, request: UpdateRubrosidomainRubrosidolistRubrosidodetailRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await rubrosidomainRubrosidolistRubrosidodetailService.update(String(id), request);
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
      await rubrosidomainRubrosidolistRubrosidodetailService.remove(String(id));
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
