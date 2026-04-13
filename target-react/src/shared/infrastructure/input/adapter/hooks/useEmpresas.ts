/**
 * Hook: useEmpresas
 * Consume Empresas API con capa de servicio
 */

import { useCallback, useEffect, useState } from 'react';
import { EmpresasApplicationService } from '@shared/application/service/EmpresasApplicationService';
import { EmpresasGatewayAdapter } from '@shared/infrastructure/output/adapter/api/EmpresasGatewayAdapter';
import { Empresa, EmpresasFilter } from '@shared/domain/model/Empresas';

const gatewayAdapter = new EmpresasGatewayAdapter();
const empresasService = new EmpresasApplicationService(gatewayAdapter);

export function useEmpresas(autoLoad = true) {
  const [items, setItems] = useState<Empresa[]>([]);
  const [selectedItem, setSelectedItem] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchAll = useCallback(async (filter?: EmpresasFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await empresasService.listAll(filter);
      setItems(response.items);
      setPage(response.page);
      setSize(response.size);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar empresas');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await empresasService.getById(id);
      setSelectedItem(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar empresa');
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
    page,
    size,
    totalElements,
    totalPages,
    fetchAll,
    fetchById,
    clearError: () => setError(null),
  };
}
