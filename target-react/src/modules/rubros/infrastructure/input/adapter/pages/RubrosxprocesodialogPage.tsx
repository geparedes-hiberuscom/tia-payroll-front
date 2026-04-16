import React from 'react';
import {
  Button,
  ErrorBanner,
  PageShell,
} from '@shared/index';
import { RubrosxprocesodialogForm } from '../components/RubrosxprocesodialogForm';
import { RubrosxprocesodialogStats } from '../components/RubrosxprocesodialogStats';
import { RubrosxprocesodialogList } from '../components/RubrosxprocesodialogList';
import { useRubrosxprocesodialogPageController } from '../hooks/useRubrosxprocesodialogPageController';

export const RubrosxprocesodialogPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    catalogsError,
    rubros,
    procesos,
    methods,
    filters,
    selectedItem,
    totalElements,
    page,
    hasError,
    getError,
    setSelectedId,
    setFilterField,
    applyFilters,
    resetFilters,
    resetForm,
    handleSave,
    handleEditSelected,
    loadItemIntoForm,
    handleDelete,
    handlePageChange,
    handleRetry,
  } = useRubrosxprocesodialogPageController();

  return (
    <PageShell
      title="Rubros por Proceso"
      description="Administra la composición de rubros dentro de cada proceso de nómina, con secuencia, procedimiento, frecuencia, ámbito de ejecución y banderas operativas."
      actions={
        <>
          <Button
            label={selectedItem ? 'Actualizar asignación' : 'Guardar asignación'}
            type="submit"
            form="rubrosxprocesodialog-form"
            isLoading={loading}
          />
          <Button label="Nueva" variant="secondary" onClick={resetForm} />
        </>
      }
    >
      {(error || catalogsError) ? (
        <ErrorBanner
          message={error ?? catalogsError ?? 'No se pudo cargar la pantalla'}
          onRetry={() => void handleRetry()}
        />
      ) : null}

      <RubrosxprocesodialogStats items={items} totalElements={totalElements} />

      <div className="grid gap-6 xl:grid-cols-[1fr_1.65fr]">
        <RubrosxprocesodialogForm
          methods={methods}
          rubros={rubros}
          procesos={procesos}
          loading={loading}
          isEditMode={Boolean(selectedItem)}
          getError={getError}
          hasError={hasError}
          onSubmit={handleSave}
          onLoadSelected={handleEditSelected}
          onReset={resetForm}
        />

        <RubrosxprocesodialogList
          items={items}
          loading={loading}
          page={page}
          totalElements={totalElements}
          rubros={rubros}
          procesos={procesos}
          filters={filters}
          onSelectItem={setSelectedId}
          onEditItem={loadItemIntoForm}
          onDeleteItem={(itemId) => void handleDelete(itemId)}
          onFilterChange={setFilterField}
          onApplyFilters={applyFilters}
          onResetFilters={resetFilters}
          onPageChange={(nextPage) => void handlePageChange(nextPage)}
        />
      </div>
    </PageShell>
  );
};
