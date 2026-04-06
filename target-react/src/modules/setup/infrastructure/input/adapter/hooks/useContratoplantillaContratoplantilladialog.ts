import { useState, useEffect, useCallback } from 'react';
import { ContratoplantillaContratoplantilladialogService } from '../../../../application/service/ContratoplantillaContratoplantilladialogService';
import { ContratoplantillaContratoplantilladialogGatewayAdapter } from '../../../output/adapter/api/ContratoplantillaContratoplantilladialogGatewayAdapter';

import {
  ContratoplantillaContratoplantilladialogFilterParams,
} from '../dto/ContratoplantillaContratoplantilladialogDto';

import {
  ContratoplantillaContratoplantilladialog,
  CreateContratoplantillaContratoplantilladialog,
  UpdateContratoplantillaContratoplantilladialog,
} from '@modules/setup/domain/model/ContratoplantillaContratoplantilladialog';

import { ContratoplantillaContratoplantilladialogViewMapper } from '../mapper/ContratoplantillaContratoplantilladialogViewMapper';

// ─── Inyección manual de dependencias ───
const gateway = new ContratoplantillaContratoplantilladialogGatewayAdapter();
const service = new ContratoplantillaContratoplantilladialogService(gateway);

/**
 * Custom Hook que conecta la UI con el Application Service.
 */
export function useContratoplantillaContratoplantilladialog() {
  
  // -------------------------------------------
  // Estados del dominio (no DTOs)
  // -------------------------------------------
  const [items, setItems] = useState<ContratoplantillaContratoplantilladialog[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContratoplantillaContratoplantilladialog | undefined>();
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

      // Mapear DTO → Domain
      const mapped = response.content.map(ContratoplantillaContratoplantilladialogViewMapper.toDomain);

      setItems(mapped);
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

      const mapped = ContratoplantillaContratoplantilladialogViewMapper.toDomain(response);

      setSelectedItem(mapped);
      return mapped;

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
  const create = useCallback(async (model: CreateContratoplantillaContratoplantilladialog) => {
    try {
      setLoading(true);
      setError(null);

      const request = ContratoplantillaContratoplantilladialogViewMapper.toCreateRequest(model);
      const response = await service.create(request);
      const mapped = ContratoplantillaContratoplantilladialogViewMapper.toDomain(response);

      // Agregar a la lista
      setItems(prev => [...prev, mapped]);

      return mapped;

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // -------------------------------------------
  // Update
  // -------------------------------------------
  const update = useCallback(async (id: string, model: UpdateContratoplantillaContratoplantilladialog) => {
    try {
      setLoading(true);
      setError(null);

      const request = ContratoplantillaContratoplantilladialogViewMapper.toUpdateRequest(model);
      const response = await service.update(id, request);
      const mapped = ContratoplantillaContratoplantilladialogViewMapper.toDomain(response);

      // Actualizar lista
      setItems(prev =>
        prev.map(item => (item.id === mapped.id ? mapped : item))
      );

      setSelectedItem(mapped);

      return mapped;

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
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

      setItems(prev => prev.filter(item => item.id !== Number(id)));

      if (selectedItem?.id === Number(id)) {
        setSelectedItem(undefined);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
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