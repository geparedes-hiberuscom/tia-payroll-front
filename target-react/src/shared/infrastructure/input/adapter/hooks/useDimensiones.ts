/**
 * Hook: useDimensiones
 * Consume Dimensiones API con capa de servicio
 */

import { useCallback, useEffect, useState } from 'react';
import { DimensionesApplicationService } from '@shared/application/service/DimensionesApplicationService';
import { DimensionesGatewayAdapter } from '@shared/infrastructure/output/adapter/api/DimensionesGatewayAdapter';
import {
  DimensionType,
  DimensionItem,
  DimensionesFilter,
} from '@shared/domain/model/Dimensiones';

const gatewayAdapter = new DimensionesGatewayAdapter();
const dimensionesService = new DimensionesApplicationService(gatewayAdapter);

export function useDimensiones(autoLoad = true) {
  const [types, setTypes] = useState<DimensionType[]>([]);
  const [items, setItems] = useState<DimensionItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<DimensionItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchTypes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dimensionesService.listTypes();
      setTypes(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tipos de dimensiones');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchItems = useCallback(async (dimensionCode: string, filter?: DimensionesFilter) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dimensionesService.listItems(dimensionCode, filter);
      setItems(response.items);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar items de dimensión');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchItemById = useCallback(async (dimensionCode: string, id: string | number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dimensionesService.getItemById(dimensionCode, id);
      setSelectedItem(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar item de dimensión');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoLoad) {
      fetchTypes();
    }
  }, [autoLoad, fetchTypes]);

  return {
    types,
    items,
    selectedItem,
    loading,
    error,
    totalElements,
    totalPages,
    fetchTypes,
    fetchItems,
    fetchItemById,
    clearError: () => setError(null),
  };
}
