import React from 'react';
import { useBeneficios } from '../hooks/useBeneficios';
import { BeneficiosList } from '../components/BeneficiosList';
import { BeneficiosForm } from '../components/BeneficiosForm';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ErrorBanner } from '@shared/infrastructure/input/adapter/components/ErrorBanner';

export const BeneficiosPage: React.FC = () => {
  const { items, loading, error, create, remove, fetchAll } = useBeneficios();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>🎁 Beneficios Especiales</h1>
      <p>Vales, provisiones, CrediTIA</p>

      {error && <ErrorBanner message={error} onRetry={fetchAll} />}

      <BeneficiosForm onSubmit={create} loading={loading} />

      {loading && items.length === 0 ? (
        <Loading />
      ) : (
        <BeneficiosList items={items} onDelete={remove} />
      )}
    </div>
  );
};
