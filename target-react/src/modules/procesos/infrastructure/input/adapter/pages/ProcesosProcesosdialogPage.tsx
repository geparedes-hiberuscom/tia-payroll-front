import React, { useMemo, useState } from 'react';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';
import { useProcesosProcesosdialog } from '../hooks/useProcesosProcesosdialog';
import { ProcesosProcesosdialog, CreateProcesosProcesosdialog, UpdateProcesosProcesosdialog } from '../../../../domain/model/ProcesosProcesosdialog';
import { ProcesosProcesosdialogList } from '../components/ProcesosProcesosdialogList';
import { ProcesosProcesosdialogForm } from '../components/ProcesosProcesosdialogForm';
import { ProcesosProcesosdialogFilterParams } from '../dto/ProcesosProcesosdialogDto';
import { Button, Modal, PageShell, SectionCard, Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/index';
import { useRubrosxprocesodialogPageController } from '@modules/rubros/infrastructure/input/adapter/hooks/useRubrosxprocesodialogPageController';
import { RubrosxprocesodialogForm } from '@modules/rubros/infrastructure/input/adapter/components/RubrosxprocesodialogForm';
import { RubrosxprocesodialogList } from '@modules/rubros/infrastructure/input/adapter/components/RubrosxprocesodialogList';

export const ProcesosProcesosdialogPage: React.FC = () => {
  const { items, loading, error, create, update, remove, fetchAll, clearError, page, size, totalElements } = useProcesosProcesosdialog();
  const [showForm, setShowForm] = useState(false);
  const [isReadOnlyForm, setIsReadOnlyForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProcesosProcesosdialog | undefined>(undefined);
  const [selectedProceso, setSelectedProceso] = useState<ProcesosProcesosdialog | null>(null);
  const [rubrosTab, setRubrosTab] = useState<'listado' | 'formulario'>('listado');
  const [activeFilters, setActiveFilters] = useState<ProcesosProcesosdialogFilterParams>({ page: 0, size: 10 });

  const {
    items: rubrosProcesoItems,
    loading: rubrosProcesoLoading,
    error: rubrosProcesoError,
    catalogsError: rubrosProcesoCatalogsError,
    rubros,
    procesos,
    methods,
    filters,
    selectedItem: selectedRubroProceso,
    totalElements: rubrosProcesoTotalElements,
    page: rubrosProcesoPage,
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
    handleDelete: handleDeleteRubroProceso,
    handlePageChange,
    handleRetry,
  } = useRubrosxprocesodialogPageController({
    fixedProcesoId: selectedProceso?.id ?? null,
  });

  const domainItems = useMemo(() => items, [items]);

  const closeProcessFormModal = () => {
    setShowForm(false);
    setIsReadOnlyForm(false);
    setEditingItem(undefined);
  };

  const openCreateProcessModal = () => {
    setEditingItem(undefined);
    setIsReadOnlyForm(false);
    setShowForm(true);
  };

  const handleEdit = (item: ProcesosProcesosdialog) => {
    setIsReadOnlyForm(true);
    setEditingItem(item);
    setShowForm(true);
  };

  const handleSubmit = async (data: CreateProcesosProcesosdialog | UpdateProcesosProcesosdialog) => {
    if (editingItem) {
      await update(String(editingItem.id), data as UpdateProcesosProcesosdialog);
    } else {
      await create(data as CreateProcesosProcesosdialog);
    }
    closeProcessFormModal();
    await fetchAll(activeFilters);
  };

  const handleDeleteProceso = async (id: string) => {
    const ok = window.confirm('Deseas eliminar este registro?');
    if (!ok) {
      return;
    }
    await remove(id);
    await fetchAll(activeFilters);
  };

  return (
    <PageShell
      title="Procesos"
      description="Administra los procesos disponibles, consulta su configuracion y aplica altas o cambios desde un formulario modal."
      actions={
        !showForm ? (
          <Button
            type="button"
            label="Nuevo proceso"
            onClick={openCreateProcessModal}
          />
        ) : undefined
      }
    >
      {error && <ErrorBanner message={error} onRetry={() => { clearError(); fetchAll(activeFilters); }} />}

      {loading && domainItems.length === 0 && <Loading message="Cargando listado..." />}

      {showForm && (
        <Modal
          open={showForm}
          setIsOpen={(open: boolean) => {
            if (!open) {
              closeProcessFormModal();
              return;
            }

            setShowForm(true);
          }}
          title={
            editingItem
              ? isReadOnlyForm
                ? 'Detalle de proceso'
                : 'Editar proceso'
              : 'Nuevo proceso'
          }
          size="lg"
        >
          <ProcesosProcesosdialogForm
            key={editingItem ? `edit-${editingItem.id}` : 'create-new'}
            initialData={editingItem}
            readOnly={isReadOnlyForm}
            onSubmit={handleSubmit}
            onCancel={closeProcessFormModal}
            loading={loading}
          />
        </Modal>
      )}

      <SectionCard
        title="Listado de procesos"
        description="Consulta y gestiona procesos registrados con paginacion y acciones de mantenimiento."
      >
        <ProcesosProcesosdialogList
          items={domainItems}
          loading={loading}
          page={page}
          pageSize={size}
          totalItems={totalElements}
          onPageChange={(nextPage) => {
            const nextFilters: ProcesosProcesosdialogFilterParams = {
              ...activeFilters,
              page: nextPage,
              size,
            };
            setActiveFilters(nextFilters);
            fetchAll(nextFilters);
          }}
          onSelect={(item) => {
            setSelectedProceso(item);
            resetForm();
            setRubrosTab('listado');
          }}
          onEdit={handleEdit}
          onDelete={handleDeleteProceso}
        />
      </SectionCard>

      {selectedProceso ? (
        <Modal
          open={Boolean(selectedProceso)}
          setIsOpen={(open: boolean) => {
            if (!open) {
              setSelectedProceso(null);
              setRubrosTab('listado');
              resetForm();
            }
          }}
          title={`Rubros por proceso: ${selectedProceso.nombre ?? `#${selectedProceso.id}`}`}
          size="lg"
        >
          {(rubrosProcesoError || rubrosProcesoCatalogsError) ? (
            <ErrorBanner
              message={rubrosProcesoError ?? rubrosProcesoCatalogsError ?? 'No se pudo cargar rubros por proceso'}
              onRetry={() => void handleRetry()}
            />
          ) : null}

          <div className="mb-4 flex justify-end">
            <Button
              label="Nueva asignación"
              onClick={() => {
                resetForm();
                setRubrosTab('formulario');
              }}
              disabled={rubrosProcesoLoading}
            />
          </div>

          <Tabs value={rubrosTab} onValueChange={(value) => setRubrosTab(value as 'listado' | 'formulario')}>
            <TabsList>
              <TabsTrigger value="listado">Listado</TabsTrigger>
              <TabsTrigger value="formulario">Formulario</TabsTrigger>
            </TabsList>

            <TabsContent value="listado">
              <RubrosxprocesodialogList
                items={rubrosProcesoItems}
                loading={rubrosProcesoLoading}
                page={rubrosProcesoPage}
                totalElements={rubrosProcesoTotalElements}
                rubros={rubros}
                procesos={procesos}
                filters={filters}
                fixedProcesoId={selectedProceso.id}
                onSelectItem={setSelectedId}
                onEditItem={(item) => {
                  loadItemIntoForm(item);
                  setRubrosTab('formulario');
                }}
                onDeleteItem={(itemId) => void handleDeleteRubroProceso(itemId)}
                onFilterChange={setFilterField}
                onApplyFilters={applyFilters}
                onResetFilters={resetFilters}
                onPageChange={(nextPage) => void handlePageChange(nextPage)}
              />
            </TabsContent>

            <TabsContent value="formulario">
              <RubrosxprocesodialogForm
                methods={methods}
                rubros={rubros}
                procesos={procesos}
                loading={rubrosProcesoLoading}
                fixedProcesoId={selectedProceso.id}
                fixedProcesoNombre={selectedProceso.nombre}
                isEditMode={Boolean(selectedRubroProceso)}
                getError={getError}
                hasError={hasError}
                onSubmit={handleSave}
                onLoadSelected={handleEditSelected}
                onReset={resetForm}
              />
            </TabsContent>
          </Tabs>
        </Modal>
      ) : null}
    </PageShell>
  );
};
