/**
 * Custom Hook para Plantillas de Contratos
 * Gestiona estado, loading, error y operaciones CRUD + upload de archivos
 */

import { useCallback, useState } from 'react';
import { ContratoPlantillaService } from '../../../application/service/ContratoPlantillaService';
import { ContratoPlantillaGatewayAdapter } from '../../output/adapter/api/ContratoPlantillaGatewayAdapter';
import {
  CreateContratoPlantillaRequest,
  UpdateContratoPlantillaRequest,
  ContratoPlantillaResponse,
  ContratoPlantillaFilterParams,
  ArchivoPlantillaUploadRequest,
  ArchivoPlantillaUploadResponse,
} from '../../input/adapter/dto/ContratoPlantillaDto';

// Instancia única del servicio (inyección manual)
const gateway = new ContratoPlantillaGatewayAdapter();
const service = new ContratoPlantillaService(gateway);

export function useContratoPlantilla() {
  const [items, setItems] = useState<ContratoPlantillaResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContratoPlantillaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
  });

  const fetchAll = useCallback(async (filters?: ContratoPlantillaFilterParams) => {
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
      setError(err instanceof Error ? err.message : 'Error al cargar plantillas de contratos');
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
      setError(err instanceof Error ? err.message : 'Error al cargar plantilla de contrato');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateContratoPlantillaRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(request);
      await fetchAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear plantilla de contrato');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (id: number, request: UpdateContratoPlantillaRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(id, request);
        await fetchAll();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar plantilla de contrato');
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
        setError(err instanceof Error ? err.message : 'Error al eliminar plantilla de contrato');
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  const uploadArchivo = useCallback(
    async (id: number, request: ArchivoPlantillaUploadRequest) => {
      try {
        setLoading(true);
        setError(null);
        const response = await service.uploadArchivo(id, request);
        await fetchAll();
        return response;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al subir archivo');
        return null;
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
    uploadArchivo,
  };
}
