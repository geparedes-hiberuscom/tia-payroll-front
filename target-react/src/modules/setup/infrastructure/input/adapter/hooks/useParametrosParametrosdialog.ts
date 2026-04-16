import { useState, useEffect, useCallback } from 'react';
import { ParametrosParametrosdialogService } from '../../../../application/service/ParametrosParametrosdialogService';
import { ParametrosParametrosdialogGatewayAdapter } from '../../../output/adapter/api/ParametrosParametrosdialogGatewayAdapter';
import { ParametrosParametrosdialogResponse, CreateParametrosParametrosdialogRequest, UpdateParametrosParametrosdialogRequest, ParametrosParametrosdialogFilterParams } from '../dto/ParametrosParametrosdialogDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new ParametrosParametrosdialogGatewayAdapter();
const parametrosParametrosdialogService = new ParametrosParametrosdialogService(gatewayAdapter);

/**
 * Custom Hook: useParametrosParametrosdialog
 * Conecta la UI con el Application Service de parametros.zul / parametrosDialog.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useParametrosParametrosdialog() {
  const [items, setItems] = useState<ParametrosParametrosdialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ParametrosParametrosdialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: ParametrosParametrosdialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await parametrosParametrosdialogService.findAll(params);
      setItems(response.content);
      setTotalElements(response.totalElements);
      setPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (entorno: string, idParametro: string) => {
    try {
      setLoading(true);
      setError(null);
      const item = await parametrosParametrosdialogService.findById(entorno, idParametro);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateParametrosParametrosdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await parametrosParametrosdialogService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (entorno: string, idParametro: string, request: UpdateParametrosParametrosdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await parametrosParametrosdialogService.update(entorno, idParametro, request);
      setItems(prev => prev.map(item => item.entorno === entorno && item.idParametro === idParametro ? updated : item));
      setSelectedItem(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (entorno: string, idParametro: string) => {
    try {
      setLoading(true);
      setError(null);
      await parametrosParametrosdialogService.remove(entorno, idParametro);
      setItems(prev => prev.filter(item => !(item.entorno === entorno && item.idParametro === idParametro)));
      if (selectedItem?.entorno === entorno && selectedItem?.idParametro === idParametro) { setSelectedItem(null); }
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
