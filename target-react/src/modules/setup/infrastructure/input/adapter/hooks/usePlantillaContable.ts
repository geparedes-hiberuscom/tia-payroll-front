/**
 * Custom Hook para Plantillas Contables
 * Gestiona estado, loading, error y operaciones CRUD
 */

import { useCallback, useState } from 'react';
import { PlantillaContableService } from '../../../application/service/PlantillaContableService';
import { PlantillaContableGatewayAdapter } from '../../output/adapter/api/PlantillaContableGatewayAdapter';
import {
  CreatePlantillaContableRequest,
  UpdatePlantillaContableRequest,
  PlantillaContableResponse,
  PlantillaContableFilterParams,
  PlantillaContablePageResponse,
} from '../../input/adapter/dto/PlantillaContableDto';

// Instancia única del servicio (inyección manual)
const gateway = new PlantillaContableGatewayAdapter();
const service = new PlantillaContableService(gateway);

export function usePlantillaContable() {
  const [items, setItems] = useState<PlantillaContableResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<PlantillaContableResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchAll = useCallback(async (filters?: PlantillaContableFilterParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.findAll(filters);
      setItems(response.content);
      setPagination({
        page: response.page,
        size: response.size,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar plantillas contables');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const item = await service.findById(id);
      setSelectedItem(item);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar plantilla contable');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreatePlantillaContableRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(request);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear plantilla contable');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (id: number, request: UpdatePlantillaContableRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(id, request);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar plantilla contable');
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  const remove = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);
        await service.remove(id);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar plantilla contable');
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  return {
    items,
    selectedItem,
    loading,
    error,
    pagination,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
}
