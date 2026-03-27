import { useState, useEffect, useCallback } from 'react';
import { Costos } from '../../../../domain/model/Costos';
import { CostosService } from '../../../../application/service/CostosService';
import { CostosApiAdapter } from '../../../output/adapter/api/CostosApiAdapter';

// Instanciar el servicio con el adaptador de salida (inyección manual)
const outputPort = new CostosApiAdapter();
const service = new CostosService(outputPort);

export function useCostos() {
  const [items, setItems] = useState<Costos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.findAll();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (model: Omit<Costos, 'id'>) => {
    try {
      setLoading(true);
      const created = await service.create(model);
      setItems(prev => [...prev, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await service.delete(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { items, loading, error, fetchAll, create, remove };
}
