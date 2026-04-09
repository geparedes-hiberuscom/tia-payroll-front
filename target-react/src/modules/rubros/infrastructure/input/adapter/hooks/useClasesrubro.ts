import { useCallback, useEffect, useState } from 'react';
import { ClasesrubroApplicationService } from '@modules/rubros/application/service/ClasesrubroApplicationService';
import { ClasesrubroGatewayAdapter } from '@modules/rubros/infrastructure/output/adapter/api/ClasesrubroGatewayAdapter';
import {
  Clasesrubro,
  ClasesrubroFilter,
} from '@modules/rubros/domain/model/Clasesrubro';

const gatewayAdapter = new ClasesrubroGatewayAdapter();
const clasesrubroService = new ClasesrubroApplicationService(gatewayAdapter);

export function useClasesrubro(autoLoad = true) {
  const [items, setItems] = useState<Clasesrubro[]>([]);
  const [selectedItem, setSelectedItem] = useState<Clasesrubro | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);

  const fetchAll = useCallback(async (filter?: ClasesrubroFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await clasesrubroService.findAll(filter);
      setItems(response.items);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setPage(response.currentPage || 0);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clases de rubro');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (claseId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await clasesrubroService.findById(claseId);
      setSelectedItem(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar clase de rubro');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      fetchAll();
    }
  }, [autoLoad, fetchAll]);

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
    clearError: () => setError(null),
  };
}
