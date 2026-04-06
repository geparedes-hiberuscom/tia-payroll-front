import { useState, useEffect, useCallback } from 'react';
import { ReporteirinecdialogService } from '../../../../application/service/ReporteirinecdialogService';
import { ReporteirinecdialogGatewayAdapter } from '../../../output/adapter/api/ReporteirinecdialogGatewayAdapter';
import { ReporteirinecdialogResponse, GenerarReporteirinecdialogRequest, ProcesoReporteirinecdialogResponse, UpdateReporteirinecdialogRequest, ReporteirinecdialogFilterParams } from '../dto/ReporteirinecdialogDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new ReporteirinecdialogGatewayAdapter();
const reporteirinecdialogService = new ReporteirinecdialogService(gatewayAdapter);

/**
 * Custom Hook: useReporteirinecdialog
 * Conecta la UI con el Application Service de ReporteIRINECDialog.zul.
 * Maneja estado de carga, errores y datos.
 */
export function useReporteirinecdialog() {
  const [items, setItems] = useState<ReporteirinecdialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ReporteirinecdialogResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: ReporteirinecdialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await reporteirinecdialogService.findAll(params);
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
      const item = await reporteirinecdialogService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const generar = useCallback(async (request: GenerarReporteirinecdialogRequest): Promise<ProcesoReporteirinecdialogResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await reporteirinecdialogService.generar(request);
      await fetchAll();
      return resultado;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar reporte IR/INEC');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: number, request: UpdateReporteirinecdialogRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await reporteirinecdialogService.update(id, request);
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
      await reporteirinecdialogService.remove(id);
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
    generar,
    update,
    remove,
    clearError: () => setError(null),
  };
}
