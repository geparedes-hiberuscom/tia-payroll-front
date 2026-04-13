import { useCallback, useEffect, useRef, useState } from 'react';
import { EjecucionbotService } from '../../../../application/service/EjecucionbotService';
import { EjecucionbotGatewayAdapter } from '../../../output/adapter/api/EjecucionbotGatewayAdapter';
import { CreateEjecucionbotRequest, EjecucionbotFilterParams, EjecucionbotResponse, UpdateEjecucionbotRequest } from '../dto/EjecucionbotDto';

const gateway = new EjecucionbotGatewayAdapter();
const service = new EjecucionbotService(gateway);

export function useEjecucionbot() {
  const [items, setItems] = useState<EjecucionbotResponse[]>([]);
  const [selectedItem, setSelectedItem] = useState<EjecucionbotResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<EjecucionbotFilterParams | undefined>(undefined);

  const fetchAll = useCallback(async (params?: EjecucionbotFilterParams) => {
    setLoading(true);
    setError(null);
    try {
      lastFiltersRef.current = params;
      const response = await service.findAll(params);
      setItems(response.data);
      setTotalElements(response.totalElements);
      setPage(response.page);
      setSize(response.size);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al listar');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const row = await service.findById(id);
      setSelectedItem(row);
      return row;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (request: CreateEjecucionbotRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.create(request);
      await fetchAll(lastFiltersRef.current);
      return result;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const update = useCallback(async (id: string, request: UpdateEjecucionbotRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await service.update(id, request);
      setSelectedItem(result);
      await fetchAll(lastFiltersRef.current);
      return result;
    } finally {
      setLoading(false);
    }
  }, [fetchAll]);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await service.remove(id);
      await fetchAll(lastFiltersRef.current);
      if (selectedItem?.id === id) setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, [fetchAll, selectedItem]);

  useEffect(() => { void fetchAll(); }, [fetchAll]);

  return { items, selectedItem, loading, error, totalElements, page, size, fetchAll, fetchById, create, update, remove, clearError: () => setError(null) };
}
