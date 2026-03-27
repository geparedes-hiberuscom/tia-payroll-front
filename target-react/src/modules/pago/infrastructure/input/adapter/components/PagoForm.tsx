import React, { useState } from 'react';

interface PagoFormProps {
  onSubmit: (data: { nombre: string }) => void;
  loading?: boolean;
}

export const PagoForm: React.FC<PagoFormProps> = ({ onSubmit, loading }) => {
  const [nombre, setNombre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim()) {
      onSubmit({ nombre: nombre.trim() });
      setNombre('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre..."
        required
        disabled={loading}
        style={{ flex: 1, padding: '0.5rem' }}
      />
      <button type="submit" disabled={loading || !nombre.trim()}>
        {loading ? 'Guardando...' : 'Crear'}
      </button>
    </form>
  );
};
