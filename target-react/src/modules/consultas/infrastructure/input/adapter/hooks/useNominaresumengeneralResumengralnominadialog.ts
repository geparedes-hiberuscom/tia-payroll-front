import { useState, useEffect, useCallback } from 'react';
import { NominaresumengeneralResumengralnominadialogService } from '../../../../application/service/NominaresumengeneralResumengralnominadialogService';
import { NominaresumengeneralResumengralnominadialogGatewayAdapter } from '../../../output/adapter/api/NominaresumengeneralResumengralnominadialogGatewayAdapter';
import { NominaresumengeneralResumengralnominadialogResponse, CreateNominaresumengeneralResumengralnominadialogRequest, UpdateNominaresumengeneralResumengralnominadialogRequest, NominaresumengeneralResumengralnominadialogFilterParams } from '../dto/NominaresumengeneralResumengralnominadialogDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new NominaresumengeneralResumengralnominadialogGatewayAdapter();
const nominaresumengeneralResumengralnominadialogService = new NominaresumengeneralResumengralnominadialogService(gatewayAdapter);

/**
 * Custom Hook: useNominaresumengeneralResumengralnominadialog
 * Conecta la UI con el Application Service de nominaresumenGeneral.zul / ResumenGralNominaDialog.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useNominaresumengeneralResumengralnominadialog() {
  const [items, setItems] = useState<NominaresumengeneralResumengralnominadialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<NominaresumengeneralResumengralnominadialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: NominaresumengeneralResumengralnominadialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await nominaresumengeneralResumengralnominadialogService.findAll(params);
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
      const item = await nominaresumengeneralResumengralnominadialogService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateNominaresumengeneralResumengralnominadialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await nominaresumengeneralResumengralnominadialogService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateNominaresumengeneralResumengralnominadialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await nominaresumengeneralResumengralnominadialogService.update(id, request);
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
      await nominaresumengeneralResumengralnominadialogService.remove(id);
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
