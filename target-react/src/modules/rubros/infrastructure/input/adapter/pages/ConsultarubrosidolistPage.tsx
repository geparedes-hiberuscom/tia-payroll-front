import React from 'react';
import {
  Button,
  ErrorBanner,
  PageShell,
} from '@shared/index';
import { ConsultarubrosidolistFiltersSection } from '../components/ConsultarubrosidolistFiltersSection';
import { ConsultarubrosidolistList } from '../components/ConsultarubrosidolistList';
import { ConsultarubrosidolistStats } from '../components/ConsultarubrosidolistStats';
import { estadoOptions } from '../hooks/consultarubrosidolistPage.types';
import { useConsultarubrosidolistPageController } from '../hooks/useConsultarubrosidolistPageController';

export const ConsultarubrosidolistPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    catalogsError,
    totalElements,
    page,
    empresas,
    rubros,
    filters,
    nextEstado,
    selectedItem,
    enviados,
    getError,
    hasError,
    setSelectedId,
    setNextEstado,
    setFilterField,
    handleSearch,
    handleReset,
    handleExport,
    handleEstado,
    handleDelete,
    handlePageChange,
    handleRetry,
  } = useConsultarubrosidolistPageController();

  return (
    <PageShell
      title="Consulta Operativa de Rubros IDO"
      description="Concentra el flujo diario de revisión por empresa, localidad, rubro y colaborador; además expone exportación y cambio de estado operativo sobre registros consultados."
      actions={
        <>
          <Button label="Buscar" onClick={handleSearch} />
          <Button label="Exportar" variant="secondary" onClick={() => void handleExport()} />
        </>
      }
    >
      {(error || catalogsError) ? (
        <ErrorBanner
          message={error ?? catalogsError ?? 'No se pudo cargar la consulta'}
          onRetry={() => void handleRetry()}
        />
      ) : null}

      <ConsultarubrosidolistStats totalElements={totalElements} enviados={enviados} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.65fr]">
        <ConsultarubrosidolistFiltersSection
          filters={filters}
          empresas={empresas}
          rubros={rubros}
          nextEstado={nextEstado}
          estadoOptions={estadoOptions}
          selectedItem={selectedItem}
          getError={getError}
          hasError={hasError}
          onFilterChange={setFilterField}
          onSearch={handleSearch}
          onReset={handleReset}
          onNextEstadoChange={setNextEstado}
          onApplyEstado={() => void handleEstado()}
        />

        <ConsultarubrosidolistList
          items={items}
          loading={loading}
          page={page}
          totalElements={totalElements}
          onPageChange={(nextPage) => void handlePageChange(nextPage)}
          onSelectItem={setSelectedId}
          onDeleteItem={(itemId) => void handleDelete(itemId)}
        />
      </div>
    </PageShell>
  );
};
