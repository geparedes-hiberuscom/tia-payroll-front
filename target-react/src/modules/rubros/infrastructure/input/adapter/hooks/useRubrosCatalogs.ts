import { useEffect, useState } from 'react';
import { RubrosRubrosdialogGatewayAdapter } from '@modules/rubros/infrastructure/output/adapter/api/RubrosRubrosdialogGatewayAdapter';
import { ProcedimientosGatewayAdapter } from '@shared/index';

export interface CatalogOption {
  value: string;
  label: string;
  subtitle?: string;
}

type UseRubrosCatalogsParams = {
  loadRubros?: boolean;
  loadProcesos?: boolean;
  loadProcedimientos?: boolean;
};

const rubrosGateway = new RubrosRubrosdialogGatewayAdapter();
const procedimientosGateway = new ProcedimientosGatewayAdapter();

function mapProcedimientosToOptions(
  items: Array<{ nombreProcedimiento?: string; tipo?: string }>,
): CatalogOption[] {
  return items
    .map((item) => {
      const value = item.nombreProcedimiento?.trim();

      if (!value) {
        return null;
      }

      return {
        value,
        label: item.tipo ? `${item.tipo} - ${value}` : value,
      };
    })
    .filter((item): item is CatalogOption => Boolean(item?.value))
    .filter(
      (item, index, collection) =>
        collection.findIndex((candidate) => candidate.value === item.value) ===
        index,
    );
}

export function useRubrosCatalogs({
  loadRubros = true,
  loadProcesos = false,
  loadProcedimientos = false,
}: UseRubrosCatalogsParams = {}) {
  const [rubros, setRubros] = useState<CatalogOption[]>([]);
  const [procesos] = useState<CatalogOption[]>([]);
  const [procedimientos, setProcedimientos] = useState<CatalogOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCatalogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const tasks: Promise<void>[] = [];

        if (loadRubros) {
          tasks.push(
            rubrosGateway.findAll({ page: 0, size: 200 }).then((response) => {
              if (!isMounted) {
                return;
              }

              setRubros(
                response.content.map((item) => ({
                  value: item.idRubro,
                  label: item.nombre,
                  subtitle: [item.idRubro, item.efecto, item.ambito].filter(Boolean).join(' · '),
                })),
              );
            }),
          );
        }

        if (loadProcedimientos) {
          tasks.push(
            procedimientosGateway.findAll({ page: 0, size: 200 }).then((response) => {
              if (!isMounted) {
                return;
              }

              setProcedimientos(mapProcedimientosToOptions(response.data));
            }),
          );
        }

        if (loadProcesos) {
          
        }

        await Promise.all(tasks);
      } catch (cause) {
        if (isMounted) {
          setError(cause instanceof Error ? cause.message : 'No se pudieron cargar los catálogos auxiliares');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadCatalogs();

    return () => {
      isMounted = false;
    };
  }, [loadProcedimientos, loadProcesos, loadRubros]);

  return {
    rubros,
    procesos,
    procedimientos,
    loading,
    error,
  };
}
