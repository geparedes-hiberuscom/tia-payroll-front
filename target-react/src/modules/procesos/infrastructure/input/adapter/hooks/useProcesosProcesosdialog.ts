import { useCallback, useEffect, useRef, useState } from 'react';
import { ProcesosProcesosdialogApplicationService } from '../../../../application/service/ProcesosProcesosdialogApplicationService';
import { ProcesosProcesosdialogGatewayAdapter } from '../../../output/adapter/api/ProcesosProcesosdialogGatewayAdapter';
import { CreateProcesosProcesosdialog, ProcesosProcesosdialog,ProcesosProcesosdialogFilter,UpdateProcesosProcesosdialog, } from '@modules/procesos/domain/model/ProcesosProcesosdialog';

const gateway = new ProcesosProcesosdialogGatewayAdapter();
const service = new ProcesosProcesosdialogApplicationService(gateway);

export function useProcesosProcesosdialog() {
  const [items, setItems] = useState<ProcesosProcesosdialog[]>([]);
  const [selectedItem, setSelectedItem] = useState<ProcesosProcesosdialog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const lastFiltersRef = useRef<ProcesosProcesosdialogFilter | undefined>(undefined);

  const fetchAll = useCallback(async (params?: ProcesosProcesosdialogFilter) => {
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

  const create = useCallback(async (request: CreateProcesosProcesosdialog) => {
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

  const update = useCallback(async (id: string, request: UpdateProcesosProcesosdialog) => {
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
      if (selectedItem?.id === Number(id)) setSelectedItem(null);
    } finally {
      setLoading(false);
    }
  }, [fetchAll, selectedItem]);

  useEffect(() => { void fetchAll(); }, [fetchAll]);

  return { items, selectedItem, loading, error, totalElements, page, size, fetchAll, fetchById, create, update, remove, clearError: () => setError(null) };
}
