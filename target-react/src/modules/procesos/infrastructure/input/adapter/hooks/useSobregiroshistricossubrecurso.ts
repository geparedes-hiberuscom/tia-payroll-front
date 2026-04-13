import { useState, useEffect, useCallback } from 'react';
import { SobregiroshistricossubrecursoService } from '../../../../application/service/SobregiroshistricossubrecursoService';
import { SobregiroshistricossubrecursoGatewayAdapter } from '../../../output/adapter/api/SobregiroshistricossubrecursoGatewayAdapter';
import { SobregiroshistricossubrecursoResponse, CreateSobregiroshistricossubrecursoRequest, UpdateSobregiroshistricossubrecursoRequest, SobregiroshistricossubrecursoFilterParams } from '../dto/SobregiroshistricossubrecursoDto';

// ─── Inyección manual: Gateway Adapter → Service ───
const gatewayAdapter = new SobregiroshistricossubrecursoGatewayAdapter();
const sobregiroshistricossubrecursoService = new SobregiroshistricossubrecursoService(gatewayAdapter);

/**
 * Custom Hook: useSobregiroshistricossubrecurso
 * Conecta la UI con el Application Service de Sobregiros históricos (subrecurso).
 * Maneja estado de carga, errores y datos.
 */
export function useSobregiroshistricossubrecurso() {
  const [items, setItems] = useState<SobregiroshistricossubrecursoResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<SobregiroshistricossubrecursoResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (params?: SobregiroshistricossubrecursoFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await sobregiroshistricossubrecursoService.findAll(params);
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
      const item = await sobregiroshistricossubrecursoService.findById(id);
      setSelectedItem(item);
      return item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar detalle');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateSobregiroshistricossubrecursoRequest) => {
    try {
      setLoading(true);
      setError(null);
      const created = await sobregiroshistricossubrecursoService.create(request);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (id: string, request: UpdateSobregiroshistricossubrecursoRequest) => {
    try {
      setLoading(true);
      setError(null);
      const updated = await sobregiroshistricossubrecursoService.update(id, request);
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
      await sobregiroshistricossubrecursoService.remove(id);
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
