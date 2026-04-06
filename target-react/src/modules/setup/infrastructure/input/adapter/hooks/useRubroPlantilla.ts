/**
 * Custom Hook para Rubros de Plantillas Contables
 * Gestiona estado, loading, error y operaciones CRUD
 */

import { useCallback, useState } from 'react';
import { RubroPlantillaService } from '../../../application/service/RubroPlantillaService';
import { RubroPlantillaGatewayAdapter } from '../../output/adapter/api/RubroPlantillaGatewayAdapter';
import {
  CreateRubroPlantillaRequest,
  UpdateRubroPlantillaRequest,
  RubroPlantillaResponse,
  RubroPlantillaListResponse,
} from '../../input/adapter/dto/RubroPlantillaDto';

// Instancia única del servicio (inyección manual)
const gateway = new RubroPlantillaGatewayAdapter();
const service = new RubroPlantillaService(gateway);

export function useRubroPlantilla() {
  const [items, setItems] = useState<RubroPlantillaResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<RubroPlantillaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchAll = useCallback(async (plantillaId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await service.findAll(plantillaId);
      setItems(response.items);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar rubros de plantilla');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (plantillaId: number, rubroId: string) => {
    try {
      setLoading(true);
      setError(null);
      const item = await service.findById(plantillaId, rubroId);
      setSelectedItem(item);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar rubro');
      setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (plantillaId: number, request: CreateRubroPlantillaRequest) => {
    try {
      setLoading(true);
      setError(null);
      await service.create(plantillaId, request);
      await fetchAll(plantillaId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear rubro en plantilla');
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(
    async (plantillaId: number, rubroId: string, request: UpdateRubroPlantillaRequest) => {
      try {
        setLoading(true);
        setError(null);
        await service.update(plantillaId, rubroId, request);
        await fetchAll(plantillaId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al actualizar rubro en plantilla');
      } finally {
        setLoading(false);
      }
    },
    [fetchAll]
  );

  const remove = useCallback(
    async (plantillaId: number, rubroId: string) => {
      try {
        setLoading(true);
        setError(null);
        await service.remove(plantillaId, rubroId);
        await fetchAll(plantillaId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al eliminar rubro de plantilla');
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
    total,
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
}
