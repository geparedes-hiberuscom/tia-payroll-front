import React from 'react';
import { Button, ErrorBanner, PageShell, SectionCard, StatCard, formatNumberLabel } from '@shared/index';
import { RubrosidomainForm } from '../components/RubrosidomainForm';
import { RubrosidomainFilterSection } from '../components/RubrosidomainFilterSection';
import { RubrosidomainList } from '../components/RubrosidomainList';
import { useRubrosidomainPageController } from '../hooks/useRubrosidomainPageController';

export const RubrosidomainPage: React.FC = () => {
  const {
    items,
    empresas,
    rubros,
    selectedItem,
    totalElements,
    activos,
    enviados,
    page,
    methods,
    filters,
    loading,
    error,
    catalogsError,
    setFilterField,
    handleSearch,
    handleResetFilters,
    handleSave,
    handleDelete,
    handleSelectItem,
    handlePageChange,
    handleRetry,
    resetForm,
    getError,
    hasError,
  } = useRubrosidomainPageController();

  return (
    <PageShell
      title="Rubros IDO"
      description="Gestiona altas, modificaciones y consulta operativa de rubros IDO por colaborador, empresa y vigencia, manteniendo el comportamiento funcional del flujo legacy main/list/detail."
      actions={
        <>
          <Button
            label="Guardar"
            type="submit"
            form="rubro-ido-detail-form"
            isLoading={loading}
          />
          <Button label="Nuevo" variant="secondary" onClick={resetForm} disabled={loading} />
        </>
      }
    >
      {error || catalogsError ? (
        <ErrorBanner
          message={error ?? catalogsError ?? 'No se pudo cargar la pantalla'}
          onRetry={handleRetry}
        />
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Registros visibles"
          value={formatNumberLabel(totalElements)}
        />
        <StatCard label="Activos" value={formatNumberLabel(activos)} tone="emerald" />
        <StatCard label="Marcados para envío" value={formatNumberLabel(enviados)} tone="amber" />
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.7fr]">
        <RubrosidomainForm
          methods={methods}
          empresas={empresas}
          rubros={rubros}
          loading={loading}
          selectedItem={selectedItem}
          getError={getError}
          hasError={hasError}
          onSave={handleSave}
          onCancel={resetForm}
        />

        <SectionCard
          title="Listado de Rubros IDO"
          description="Filtro operativo por empresa, rubro, colaborador y vigencia para consulta y mantenimiento."
        >
          <RubrosidomainFilterSection
            filters={filters}
            empresas={empresas}
            rubros={rubros}
            getError={getError}
            hasError={hasError}
            onFilterChange={setFilterField}
            onSearch={handleSearch}
            onReset={handleResetFilters}
          />

          <RubrosidomainList
            items={items}
            loading={loading}
            page={page}
            totalElements={totalElements}
            onPageChange={handlePageChange}
            onRowClick={handleSelectItem}
            onDelete={handleDelete}
          />
        </SectionCard>
      </div>
    </PageShell>
  );
};
