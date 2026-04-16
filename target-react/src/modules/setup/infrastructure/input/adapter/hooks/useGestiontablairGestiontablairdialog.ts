import { useState, useEffect, useCallback } from 'react';
import { GestiontablairGestiontablairdialogService } from '../../../../application/service/GestiontablairGestiontablairdialogService';
import { GestiontablairGestiontablairdialogGatewayAdapter } from '../../../output/adapter/api/GestiontablairGestiontablairdialogGatewayAdapter';
import { GestiontablairGestiontablairdialogResponse, CreateGestiontablairGestiontablairdialogRequest, UpdateGestiontablairGestiontablairdialogRequest, GestiontablairGestiontablairdialogFilterParams } from '../dto/GestiontablairGestiontablairdialogDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new GestiontablairGestiontablairdialogGatewayAdapter();
const gestiontablairGestiontablairdialogService = new GestiontablairGestiontablairdialogService(gatewayAdapter);

/**
 * Custom Hook: useGestiontablairGestiontablairdialog
 * Conecta la UI con el Application Service de gestionTablaIR.zul / gestionTablaIRDialog.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useGestiontablairGestiontablairdialog() {
  const [items, setItems] = useState<GestiontablairGestiontablairdialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<GestiontablairGestiontablairdialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: GestiontablairGestiontablairdialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await gestiontablairGestiontablairdialogService.findAll(params);
      setItems(response.content);
      setTotalElements(response.totalElements);
      setPage(response.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const item = await gestiontablairGestiontablairdialogService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateGestiontablairGestiontablairdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await gestiontablairGestiontablairdialogService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, request: UpdateGestiontablairGestiontablairdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await gestiontablairGestiontablairdialogService.update(id, request);
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

  const remove = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await gestiontablairGestiontablairdialogService.remove(id);
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
