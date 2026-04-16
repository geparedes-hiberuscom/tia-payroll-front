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
      const errorMessage = err instanceof Error ? err.message : 'Error al crear';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, request: UpdateGastospersonalesdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await gastospersonalesdialogService.update(id, request);
      setItems(prev => prev.map(item => item.id === id ? updated : item));
      setSelectedItem(updated);
      return updated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await gastospersonalesdialogService.remove(id);
      setItems(prev => prev.filter(item => item.id !== id));
      setSelectedItem(prev => prev?.id === id ? null : prev);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const exportarExcel = useCallback(async (empresaId: number, anio: number) => {
    let url: string | null = null;
    let link: HTMLAnchorElement | null = null;
    
    try {
      setLoading(true);
      setError(null);
      const blob = await gastospersonalesdialogService.exportarExcel(empresaId, anio);
      
      if (typeof globalThis === 'undefined' || !globalThis.URL) {
        throw new Error('No se puede descargar en este navegador');
      }
      
      url = globalThis.URL.createObjectURL(blob);
      link = document.createElement('a');
      link.href = url;
      link.download = `GastosPersonales_${anio}_${empresaId}.xls`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al exportar';
      setError(errorMessage);
    } finally {
      // Limpieza segura
      if (link?.parentNode === document.body) {
        try {
          link.remove();
        } catch (e) {
          console.log('No se pudo eliminar el enlace de descarga:', e);
        }
      }
      if (url && typeof globalThis !== 'undefined' && globalThis.URL) {
        try {
          globalThis.URL.revokeObjectURL(url);
        } catch (e) {
          console.log('No se pudo revocar el URL del blob:', e);
        }
      }
      setLoading(false);
    }
  }, []);

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
    exportarExcel,
    clearError: () => setError(null),
  };
}
