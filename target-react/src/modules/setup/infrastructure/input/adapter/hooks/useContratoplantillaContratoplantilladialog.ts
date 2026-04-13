import { useState, useEffect, useCallback } from 'react';
import { ContratoplantillaContratoplantilladialogService } from '../../../../application/service/ContratoplantillaContratoplantilladialogService';
import { ContratoplantillaContratoplantilladialogGatewayAdapter } from '../../../output/adapter/api/ContratoplantillaContratoplantilladialogGatewayAdapter';

import {
  ContratoplantillaContratoplantilladialogResponse,
  ContratoplantillaContratoplantilladialogFilterParams,
  CreateContratoplantillaContratoplantilladialogRequest,
  UpdateContratoplantillaContratoplantilladialogRequest,
} from '../dto/ContratoplantillaContratoplantilladialogDto';

// ─── Inyección manual de dependencias ───
const gateway = new ContratoplantillaContratoplantilladialogGatewayAdapter();
const service = new ContratoplantillaContratoplantilladialogService(gateway);

/**
 * Custom Hook que conecta la UI con el Application Service.
 */
export function useContratoplantillaContratoplantilladialog() {
  
  // -------------------------------------------
  // Estados con DTOs Response
  // -------------------------------------------
  const [items, setItems] = useState<ContratoplantillaContratoplantilladialogResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContratoplantillaContratoplantilladialogResponse | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);

  // -------------------------------------------
  // Fetch All
  // -------------------------------------------
  const fetchAll = useCallback(async (params?: ContratoplantillaContratoplantilladialogFilterParams) => {
    try {
      setLoading(true);
      setError(null);

      const response = await service.findAll(params);
      setItems(response.content);
      setTotalElements(response.totalElements);
      setPage(response.page);

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------------------
  // Fetch By ID
  // -------------------------------------------
  const fetchById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await service.findById(id);
      setSelectedItem(response);
      return response;

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar detalle");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------------------
  // Create
  // -------------------------------------------
  const create = useCallback(async (request: CreateContratoplantillaContratoplantilladialogRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await service.create(request);

      // Agregar a la lista
      setItems(prev => [...prev, response]);

      return response;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------------------
  // Update
  // -------------------------------------------
  const update = useCallback(async (id: string, request: UpdateContratoplantillaContratoplantilladialogRequest) => {
    try {
      setLoading(true);
      setError(null);

      const response = await service.update(id, request);

      // Actualizar lista
      setItems(prev =>
        prev.map(item => (item.id === id ? response : item))
      );

      setSelectedItem(response);

      return response;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------------------
  // Remove
  // -------------------------------------------
  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      await service.remove(id);

      setItems(prev => prev.filter(item => item.id !== id));

      if (selectedItem?.id === id) {
        setSelectedItem(undefined);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedItem]);

  // -------------------------------------------
  // Cargar lista al iniciar
  // -------------------------------------------
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // -------------------------------------------
  // Hook API
  // -------------------------------------------
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