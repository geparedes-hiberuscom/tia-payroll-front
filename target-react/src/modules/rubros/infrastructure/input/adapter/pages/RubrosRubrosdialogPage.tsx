import React, { useState } from "react";
import { useRubrosRubrosdialog } from "../hooks/useRubrosRubrosdialog";
import { RubrosRubrosdialogList } from "../components/RubrosRubrosdialogList";
import { RubrosRubrosdialogForm } from "../components/RubrosRubrosdialogForm";
import { RubrosRubrosdialogFilter } from "../components/RubrosRubrosdialogFilter";
import {
  CreateRubrosRubrosdialog,
  RubrosRubrosdialogFilter as RubrosRubrosdialogFilterModel,
  RubrosRubrosdialog,
  UpdateRubrosRubrosdialog,
} from "../../../../domain/model/RubrosRubrosdialog";
import {
  Button,
  ErrorBanner,
  Loading,
  Modal,
  PageShell,
  SectionCard,
} from '@shared/index';

export const RubrosRubrosdialogPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    page,
    totalElements,
    fetchAll,
    create,
    update,
    remove,
    clearError,
    fetchById,
  } = useRubrosRubrosdialog();
  const [showForm, setShowForm] = useState(false);
  const [isReadOnlyForm, setIsReadOnlyForm] = useState(false);
  const [editingItem, setEditingItem] = useState<
    RubrosRubrosdialog | undefined
  >(undefined);
  const [activeFilters, setActiveFilters] = useState<RubrosRubrosdialogFilterModel>({});

  const handleSubmit = async (
    data: CreateRubrosRubrosdialog | UpdateRubrosRubrosdialog,
  ) => {
    if (editingItem) {
      await update(editingItem.idRubro, data as UpdateRubrosRubrosdialog);
    } else {
      await create(data as CreateRubrosRubrosdialog);
    }
    await fetchAll(activeFilters);
    setShowForm(false);
    setIsReadOnlyForm(false);
    setEditingItem(undefined);
  };

  const handleView = async (item: RubrosRubrosdialog) => {
    const detailedItem = await fetchById(item.idRubro);
    setEditingItem(detailedItem ?? item);
    setIsReadOnlyForm(true);
    setShowForm(true);
  };

  const handleEdit = async (item: RubrosRubrosdialog) => {
    const detailedItem = await fetchById(item.idRubro);
    setEditingItem(detailedItem ?? item);
    setIsReadOnlyForm(false);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Deseas eliminar este registro?");
    if (!ok) {
      return;
    }
    await remove(id);
    await fetchAll(activeFilters);
  };

  return (
    <PageShell
      title="Rubros"
      description="Administra rubros, consulta su detalle y configura parametros operativos desde un formulario con tabs."
      actions={
        !showForm ? (
          <Button
            type="button"
            label="Nuevo rubro"
            onClick={() => {
              setShowForm(true);
              setIsReadOnlyForm(false);
              setEditingItem(undefined);
            }}
          />
        ) : undefined
      }
    >

      {error && (
        <ErrorBanner
          message={error}
          onRetry={() => {
            clearError();
            fetchAll(activeFilters);
          }}
        />
      )}

      <SectionCard
        title="Filtros"
        description="Refina la busqueda por identificador, nombre, ambito y efecto."
      >
        <RubrosRubrosdialogFilter
          loading={loading}
          onApply={(params) => {
            setActiveFilters(params);
            fetchAll(params);
          }}
          onClear={() => {
            const emptyFilters: RubrosRubrosdialogFilterModel = { page: 0 };
            setActiveFilters(emptyFilters);
            fetchAll(emptyFilters);
          }}
        />
      </SectionCard>

      {showForm && (
        <Modal
          open={showForm}
          setIsOpen={(open) => {
            setShowForm(open);
            if (!open) {
              setEditingItem(undefined);
              setIsReadOnlyForm(false);
            }
          }}
          title={
            editingItem
              ? isReadOnlyForm
                ? "Detalle de rubro"
                : "Editar rubro"
              : "Nuevo rubro"
          }
          size="lg"
        >
          <RubrosRubrosdialogForm
            initialData={editingItem}
            readOnly={isReadOnlyForm}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setIsReadOnlyForm(false);
              setEditingItem(undefined);
            }}
            loading={loading}
            error={error ?? ""}
          />
        </Modal>
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando rubros..." />
      ) : (
        <SectionCard
          title="Listado de rubros"
          description="Consulta resultados paginados y ejecuta acciones de ver, editar o eliminar."
        >
          <RubrosRubrosdialogList
            items={items}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            page={page}
            pageSize={activeFilters.size ?? 10}
            totalItems={totalElements}
            onPageChange={(nextPage) => {
              const nextFilters: RubrosRubrosdialogFilterModel = {
                ...activeFilters,
                page: nextPage,
                size: activeFilters.size ?? 10,
              };
              setActiveFilters(nextFilters);
              fetchAll(nextFilters);
            }}
          />
        </SectionCard>
      )}
    </PageShell>
  );
};
