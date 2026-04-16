import React, { useState } from 'react';
import { UIButton } from '../../components/ui-kit';
import { ParametrosParametrosdialogFilterParams } from '../../dto/ParametrosParametrosdialogDto';

interface ParametrosParametrosdialogFilterProps {
  loading?: boolean;
  onApply: (params: ParametrosParametrosdialogFilterParams) => void;
  onClear: () => void;
}

export const ParametrosParametrosdialogFilter: React.FC<ParametrosParametrosdialogFilterProps> = ({
  loading,
  onApply,
  onClear,
}) => {
  const [idParametro, setIdParametro] = useState('');
  const [parametro, setParametro] = useState('');

  const handleApply = (event: React.FormEvent) => {
    event.preventDefault();
    onApply({
      idParametro: idParametro.trim() || undefined,
      parametro: parametro.trim() || undefined,
    });
  };

  const handleClear = () => {
    setIdParametro('');
    setParametro('');
    onClear();
  };

  return (
    <form
      onSubmit={handleApply}
      data-testid="parametros-parametrosdialog-filter"
      style={{
        display: 'grid',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        background: '#fff',
      }}
    >
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ fontWeight: 'bold', marginBottom: '0.75rem' }}>Filtros</legend>

        <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <div>
            <label htmlFor="filter-id-parametro" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
              ID Parámetro
            </label>
            <input
              id="filter-id-parametro"
              type="text"
              value={idParametro}
              onChange={(event) => setIdParametro(event.target.value)}
              disabled={loading}
              placeholder="Ej: PARAM_001"
              data-testid="parametros-filter-id-parametro"
              style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>

          <div>
            <label htmlFor="filter-parametro" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>
              Nombre Parámetro
            </label>
            <input
              id="filter-parametro"
              type="text"
              value={parametro}
              onChange={(event) => setParametro(event.target.value)}
              disabled={loading}
              placeholder="Ej: Parámetro..."
              data-testid="parametros-filter-parametro"
              style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
            />
          </div>
        </div>
      </fieldset>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <UIButton
          variant="primary"
          type="submit"
          disabled={loading}
          data-testid="parametros-filter-apply"
        >
          Buscar
        </UIButton>
        <UIButton
          variant="outline"
          type="button"
          disabled={loading}
          onClick={handleClear}
          data-testid="parametros-filter-clear"
        >
          Limpiar
        </UIButton>
      </div>
    </form>
  );
};
