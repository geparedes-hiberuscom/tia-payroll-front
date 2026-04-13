import React, { useState } from "react";

export interface DragDropItem {
  id: number;
  orden: number;
}

export interface DragDropOption {
  id: number;
  label: string;
}

interface DragDropListWithOrderProps {
  label: string;
  items: DragDropItem[];
  availableItems: DragDropOption[];
  onChange: (items: DragDropItem[]) => void;
  disabled?: boolean;
  testId?: string;
}

/**
 * Componente de lista ordenable mediante drag and drop.
 * Permite arrastrar elementos desde una lista disponible hacia una sección drop para ordenarlos.
 * Cada item tiene id y orden que se mantienen sincronizados.
 */
export const DragDropListWithOrder: React.FC<DragDropListWithOrderProps> = ({
  label,
  items,
  availableItems,
  onChange,
  disabled = false,
  testId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggedAvailableId, setDraggedAvailableId] = useState<number | null>(null);
  const [draggedSource, setDraggedSource] = useState<"available" | "selected" | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const filteredAvailableItems = availableItems.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const resetDragState = () => {
    setDraggedIndex(null);
    setDraggedAvailableId(null);
    setDraggedSource(null);
    setDragOverIndex(null);
  };

  const normalizeOrder = (list: DragDropItem[]) =>
    list.map((item, index) => ({ ...item, orden: index + 1 }));

  const handleDragStartAvailable = (
    event: React.DragEvent<HTMLDivElement>,
    optionId: number,
  ) => {
    if (!disabled) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", `available:${optionId}`);
      setDraggedAvailableId(optionId);
      setDraggedSource("available");
    }
  };

  const handleDragStartSelected = (
    event: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (!disabled) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", `selected:${index}`);
      setDraggedIndex(index);
      setDraggedSource("selected");
    }
  };

  const handleDrop = (dropIndex: number) => {
    // Validar que se haya iniciado un drag válido
    if (disabled || draggedSource === null) {
      resetDragState();
      return;
    }

    // Caso 1: Arrastrando desde lista disponible
    if (draggedSource === "available") {
      if (draggedAvailableId === null) {
        resetDragState();
        return;
      }

      const availableItem = availableItems.find((item) => item.id === draggedAvailableId);
      if (!availableItem) {
        resetDragState();
        return;
      }

      const alreadyExists = items.some((item) => item.id === availableItem.id);
      if (alreadyExists) {
        resetDragState();
        return;
      }

      const insertIndex = Math.max(0, Math.min(dropIndex, items.length));
      const nextItems = [
        ...items.slice(0, insertIndex),
        { id: availableItem.id, orden: insertIndex + 1 },
        ...items.slice(insertIndex),
      ];
      onChange(normalizeOrder(nextItems));
    }
    // Caso 2: Reordenando dentro de items seleccionados
    else if (draggedSource === "selected" && draggedIndex !== null && draggedIndex !== dropIndex) {
      const newItems = [...items];
      const [draggedItem] = newItems.splice(draggedIndex, 1);
      const finalIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;
      newItems.splice(finalIndex, 0, draggedItem);
      onChange(normalizeOrder(newItems));
    }

    resetDragState();
  };
  const handleDragEnd = () => {
    resetDragState();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{ fontWeight: "500" }}>{label}</label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {/* LISTA DISPONIBLE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem",
              maxHeight: "300px",
         }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar opción..."
            disabled={disabled}
            data-testid={testId ? `${testId}-available-search` : undefined}
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "0.875rem",
            }}
          />
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflowY: "auto",
              backgroundColor: "#fafafa",
              minHeight: "100px",
              flex: 1,
            }}
          >
            {filteredAvailableItems.length === 0 ? (
              <p style={{ margin: "1rem", color: "#999", textAlign: "center", fontSize: "0.875rem" }}>
                Sin coincidencias
              </p>
            ) : (
              <div>
                {filteredAvailableItems.map((option, index) => (
                  <div
                    key={option.id}
                    data-testid={testId ? `${testId}-available-${index}` : undefined}
                    draggable={!disabled}
                    onDragStart={(event) => handleDragStartAvailable(event, option.id)}
                    onDragEnd={handleDragEnd}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.75rem",
                      borderBottom: "1px solid #ddd",
                      backgroundColor:
                        draggedAvailableId === option.id && draggedSource === "available"
                          ? "#fff3e0"
                          : "white",
                      opacity:
                        draggedAvailableId === option.id && draggedSource === "available"
                          ? 0.7
                          : 1,
                      cursor: disabled ? "not-allowed" : "move",
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    <span
                      style={{
                        color: "#999",
                        fontSize: "0.875rem",
                        marginRight: "0.5rem",
                        userSelect: "none",
                      }}
                    >
                      ⋮⋮
                    </span>
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ÁREA DROP - ITEMS SELECCIONADOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "300px" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "#555" }}>
            Seleccionados ({items.length})
          </h4>
          <div
            onDragOver={(event) => {
              if (!disabled) {
                event.preventDefault();
                setDragOverIndex(items.length);
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              handleDrop(items.length);
            }}
            style={{
              border: "2px dashed #999",
              borderRadius: "4px",
              overflowY: "auto",
              backgroundColor: "#f9f9f9",
              minHeight: "100px",
              padding: "0.5rem",
              flex: 1,

            }}
          >
            {items.length === 0 ? (
              <p style={{ margin: "1rem", color: "#999", textAlign: "center", fontSize: "0.875rem" }}>
                Arrastra elementos aquí
              </p>
            ) : (
              <div>
                {items.map((item, index) => {
                  const label =
                    availableItems.find((opt) => opt.id === item.id)?.label ||
                    `ID: ${item.id}`;

                  return (
                    <div
                      key={index}
                      data-testid={testId ? `${testId}-selected-${index}` : undefined}
                      draggable={!disabled}
                      onDragStart={(event) => handleDragStartSelected(event, index)}
                      onDragOver={(event) => {
                        if (!disabled) {
                          event.preventDefault();
                          setDragOverIndex(index);
                        }
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleDrop(index);
                      }}
                      onDragEnd={handleDragEnd}
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        padding: "0.75rem",
                        marginBottom: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ddd",
                        backgroundColor:
                          dragOverIndex === index && draggedSource === "available"
                            ? "#e3f2fd"
                            : draggedIndex === index && draggedSource === "selected"
                            ? "#fff3e0"
                            : "#fff",
                        opacity:
                          draggedIndex === index && draggedSource === "selected"
                            ? 0.7
                            : 1,
                        cursor: disabled ? "not-allowed" : "grab",
                        alignItems: "center",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          color: "#999",
                          fontSize: "0.875rem",
                          cursor: "grab",
                          userSelect: "none",
                        }}
                      >
                        ⋮⋮
                      </span>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.875rem", fontWeight: "500" }}>
                          {label}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          onChange(normalizeOrder(items.filter((_, i) => i !== index)));
                        }}
                        disabled={disabled}
                        style={{
                          padding: "0.25rem 0.5rem",
                          backgroundColor: "#ffebee",
                          color: "#c62828",
                          border: "1px solid #ffcdd2",
                          borderRadius: "4px",
                          cursor: disabled ? "not-allowed" : "pointer",
                          fontSize: "0.875rem",
                        }}
                        data-testid={
                          testId ? `${testId}-selected-${index}-delete` : undefined
                        }
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
