import React from 'react';
import {
  Button,
  ErrorBanner,
  PageShell,
} from '@shared/index';
import { RubrosidocargaxprocesoForm } from '../components/RubrosidocargaxprocesoForm';
import { RubrosidocargaxprocesoList } from '../components/RubrosidocargaxprocesoList';
import { useRubrosidocargaxprocesoPageController } from '../hooks/useRubrosidocargaxprocesoPageController';

export const RubrosidocargaxprocesoPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    catalogsError,
    procesos,
    methods,
    filters,
    getError,
    hasError,
    setFilterField,
    handleSearch,
    handleResetForm,
    handleRetry,
  } = useRubrosidocargaxprocesoPageController();

  return (
    <PageShell
      title="Consulta de rubros cargados por proceso"
      description="Visualiza los rubros cargados por proceso, período y colaborador, separados por tipo (ingresos, descuentos, otros) con totales por sección."
      actions={
        <>
          <Button label="Refrescar" variant="secondary" onClick={() => void handleRetry()} />
        </>
      }
    >
      {(error || catalogsError) ? (
        <ErrorBanner
          message={error ?? catalogsError ?? 'No se pudo cargar la página'}
          onRetry={() => void handleRetry()}
        />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <RubrosidocargaxprocesoForm
          methods={methods}
          procesos={procesos}
          loading={loading}
          getError={getError}
          hasError={hasError}
          onSearch={handleSearch}
          onReset={handleResetForm}
        />

        <RubrosidocargaxprocesoList
          items={items}
          loading={loading}
          filters={filters}
          onFilterChange={setFilterField}
        />
      </div>
    </PageShell>
  );
};
