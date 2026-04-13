import React, { useState } from "react";

export interface MultiSelectOption {
  id: string | number;
  label: string;
}

interface MultiSelectListProps {
  label: string;
  options: MultiSelectOption[];
  selectedIds: (string | number)[];
  onChange: (selectedIds: (string | number)[]) => void;
  disabled?: boolean;
  placeholder?: string;
  testId?: string;
}

/**
 * Componente de selección múltiple con búsqueda y visualización tipo lista.
 * Presentación: cuadro de búsqueda + lista con checkboxes.
 */
export const MultiSelectList: React.FC<MultiSelectListProps> = ({
  label,
  options,
  selectedIds,
  onChange,
  disabled = false,
  placeholder = "Buscar...",
  testId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (id: string | number) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      onChange(selectedIds.filter((selected) => selected !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <label style={{ fontWeight: "500" }}>{label}</label>

      {options.length>10 && <input
        data-testid={testId ? `${testId}-search` : undefined}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={disabled}
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />}

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          maxHeight: "200px",
          overflowY: "auto",
          padding: "0.5rem",
          backgroundColor: "#fafafa",
        }}
      >
        {filteredOptions.length === 0 ? (
          <p style={{ margin: 0, color: "#999", fontSize: "0.875rem" }}>
            Sin coincidencias
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {filteredOptions.map((option) => (
              <label
                key={option.id}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  cursor: disabled ? "not-allowed" : "pointer",
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <input
                  data-testid={testId ? `${testId}-checkbox-${option.id}` : undefined}
                  type="checkbox"
                  checked={selectedIds.includes(option.id)}
                  onChange={() => handleToggle(option.id)}
                  disabled={disabled}
                  style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
