/**
 * Hook: useProcedimientos
 * Consume Procedimientos API con capa de servicio
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ProcedimientosApplicationService } from '@shared/application/service/ProcedimientosApplicationService';
import { ProcedimientosGatewayAdapter } from '@shared/infrastructure/output/adapter/api/ProcedimientosGatewayAdapter';
import {
  Procedimiento,
  ProcedimientosFilter,
} from '@shared/domain/model/Procedimientos';

const gatewayAdapter = new ProcedimientosGatewayAdapter();
const procedimientosService = new ProcedimientosApplicationService(gatewayAdapter);

export function useProcedimientos(autoLoad = true) {
  const [items, setItems] = useState<Procedimiento[]>([]);
  const [selectedItem, setSelectedItem] = useState<Procedimiento | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const lastFiltersRef = useRef<ProcedimientosFilter | undefined>(undefined);

  const fetchAll = useCallback(async (filter?: ProcedimientosFilter) => {
    try {
      setLoading(true);
      setError(null);
      lastFiltersRef.current = filter;

      const response = await procedimientosService.listAll(filter);
      setItems(response.items);
      setPage(response.page);
      setSize(response.size);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar procedimientos');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await procedimientosService.getById(id);
      setSelectedItem(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar procedimiento');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  
  const remove = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      await procedimientosService.remove(id);
      await fetchAll(lastFiltersRef.current);
      if (selectedItem?.nombreProcedimiento === id || selectedItem?.tipo === id) {
        setSelectedItem(null);
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar procedimiento');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchAll, selectedItem]);

  useEffect(() => {
    if (autoLoad) {
      void fetchAll();
    }
  }, [autoLoad, fetchAll]);

  return {
    items,
    selectedItem,
    loading,
    error,
    page,
    size,
    totalElements,
    totalPages,
    fetchAll,
    fetchById,
    remove,
    clearError: () => setError(null),
  };
}
