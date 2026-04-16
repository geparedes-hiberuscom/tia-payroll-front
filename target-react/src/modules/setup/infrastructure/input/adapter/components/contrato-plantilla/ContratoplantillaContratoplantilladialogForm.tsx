import React, { useState, useEffect } from 'react';
import { CreateContratoplantillaContratoplantilladialogRequest, UpdateContratoplantillaContratoplantilladialogRequest, ContratoplantillaContratoplantilladialogResponse } from '../../dto/ContratoplantillaContratoplantilladialogDto';
import { UIInput, UIButton } from '../../components/ui-kit';

interface ContratoplantillaContratoplantilladialogFormProps {
  /** Si se pasa initialData, el formulario está en modo edición */
  initialData?: ContratoplantillaContratoplantilladialogResponse;
  onSubmit: (data: CreateContratoplantillaContratoplantilladialogRequest | UpdateContratoplantillaContratoplantilladialogRequest) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

/**
 * Componente Formulario: contratoPlantilla.zul / contratoPlantillaDialog.zul
 * Formulario de creación/edición basado en las pantallas ZUL fuente.
 * Pantallas fuente: contratoPlantilla.zul, contratoPlantillaDialog.zul
 */
export const ContratoplantillaContratoplantilladialogForm: React.FC<ContratoplantillaContratoplantilladialogFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  error,
}) => {
  const isEditMode = !!initialData;

  // Estados para campos de creación/edición
  const [descripcion, setDescripcion] = useState(initialData?.descripcion || '');
  const [nombreArchivo, setNombreArchivo] = useState(initialData?.nombreArchivo || '');
  const [nombreArchivo2, setNombreArchivo2] = useState(initialData?.nombreArchivo2 || '');

  useEffect(() => {
    if (initialData) {
      setDescripcion(initialData.descripcion || '');
      setNombreArchivo(initialData.nombreArchivo || '');
      setNombreArchivo2(initialData.nombreArchivo2 || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!descripcion) {
      alert('Por favor completa todos los campos requeridos (Descripción)');
      return;
    }

    const data: CreateContratoplantillaContratoplantilladialogRequest | UpdateContratoplantillaContratoplantilladialogRequest = {
      vdescplantilla: descripcion,
      vnombrearchivo: nombreArchivo || undefined,
      vnombrearchivo2: nombreArchivo2 || undefined,
    };

    onSubmit(data);
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'flex-end',
    marginTop: '1.5rem',
  };

  const getButtonText = () => {
    if (loading) return 'Guardando...';
    if (isEditMode) return 'Actualizar';
    return 'Crear';
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="contratoplantilla-contratoplantilladialog-form"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
    >
      {error && (
        <div
          style={{
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: 4,
            padding: '1rem',
            color: '#c33',
            fontSize: '0.95rem',
            fontWeight: 500,
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Información requerida
        </legend>

        <UIInput
          label="Descripción"
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          disabled={loading}
          placeholder="Ej: Plantilla de Contrato"
          required
          fullWidth
        />
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          Información adicional (opcional)
        </legend>

        <UIInput
          label="Archivo Principal"
          type="text"
          value={nombreArchivo}
          onChange={(e) => setNombreArchivo(e.target.value)}
          disabled={loading}
          placeholder="Opcional"
          fullWidth
        />

        <div style={{ marginTop: '1rem' }}>
          <UIInput
            label="Archivo Secundario"
            type="text"
            value={nombreArchivo2}
            onChange={(e) => setNombreArchivo2(e.target.value)}
            disabled={loading}
            placeholder="Opcional"
            fullWidth
          />
        </div>
      </fieldset>

      <div style={buttonContainerStyle}>
        <UIButton
          type="submit"
          variant="primary"
          size="medium"
          disabled={loading}
        >
          {getButtonText()}
        </UIButton>
        {onCancel && (
          <UIButton
            type="button"
            variant="secondary"
            size="medium"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </UIButton>
        )}
      </div>
    </form>
  );
};
