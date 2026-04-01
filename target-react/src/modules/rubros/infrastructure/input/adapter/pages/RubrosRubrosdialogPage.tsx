import React, { useState } from "react";
import { useRubrosRubrosdialog } from "../hooks/useRubrosRubrosdialog";
import { RubrosRubrosdialogList } from "../components/RubrosRubrosdialogList";
import { RubrosRubrosdialogForm } from "../components/RubrosRubrosdialogForm";
import { RubrosRubrosdialogFilter } from "../components/RubrosRubrosdialogFilter";
import {
  CreateRubrosRubrosdialog,
  RubrosRubrosdialog,
  UpdateRubrosRubrosdialog,
} from "../../../../domain/model/RubrosRubrosdialog";
import { RubrosRubrosdialogFilterParams } from "../dto/RubrosRubrosdialogDto";
import { Loading } from "@shared/infrastructure/input/adapter/components/Loading";
import { ErrorBanner } from "@shared/infrastructure/input/adapter/components/ErrorBanner";
import { Modal } from "@shared/infrastructure/input/adapter/components/Modal";

export const RubrosRubrosdialogPage: React.FC = () => {
  const {
    items,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
    clearError,
    fetchById,
  } = useRubrosRubrosdialog();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<
    RubrosRubrosdialog | undefined
  >(undefined);
  const [activeFilters, setActiveFilters] = useState<RubrosRubrosdialogFilterParams>({});

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
    setEditingItem(undefined);
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Rubros</h1>
        {!showForm && (
          <button onClick={() => {setShowForm(true);
            setEditingItem(undefined)
          }}>+ Nuevo</button>
        )}
      </div>

      {error && (
        <ErrorBanner
          message={error}
          onRetry={() => {
            clearError();
            fetchAll(activeFilters);
          }}
        />
      )}

      <RubrosRubrosdialogFilter
        loading={loading}
        onApply={(params) => {
          setActiveFilters(params);
          fetchAll(params);
        }}
        onClear={() => {
          const emptyFilters: RubrosRubrosdialogFilterParams = { page: 0 };
          setActiveFilters(emptyFilters);
          fetchAll(emptyFilters);
        }}
      />

      {showForm && (
        <Modal
          open={showForm}
          setIsOpen={(open) => {
            setShowForm(open);
            if (!open) setEditingItem(undefined);
          }}
          title={""}
        >
          <RubrosRubrosdialogForm
            initialData={editingItem}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(undefined);
            }}
            loading={loading}
          />
        </Modal>
      )}

      {loading && items.length === 0 ? (
        <Loading message="Cargando rubros..." />
      ) : (
        <RubrosRubrosdialogList
          items={items}
          loading={loading}
          onEdit={async (item) => {
            const detailedItem = await fetchById(item.idRubro);
            console.log("Fetched item for editing:", detailedItem);
            setEditingItem(detailedItem ?? item);
            setShowForm(true);
          }}
          onDelete={async (itemId) => {
            if (window.confirm("¿Eliminar este registro?")) {
              await remove(itemId);
              await fetchAll(activeFilters);
            }
          }}
        />
      )}
    </div>
  );
};
