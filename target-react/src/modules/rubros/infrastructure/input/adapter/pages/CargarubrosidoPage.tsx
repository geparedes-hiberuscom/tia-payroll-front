import React from 'react';
import {
  Button,
  ErrorBanner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  PageShell,
} from '@shared/index';
import { CargarubrosidoDetail } from '../components/CargarubrosidoDetail';
import { CargarubrosidoList } from '../components/CargarubrosidoList';
import { CargarubrosidoStats } from '../components/CargarubrosidoStats';
import { CargarubrosidoForm } from '../components/CargarubrosidoForm';
import { useCargarubrosidoPageController } from '../hooks/useCargarubrosidoPageController';

export const CargarubrosidoPage: React.FC = () => {
  const {
    items,
    lineas,
    loading,
    error,
    catalogsError,
    totalElements,
    page,
    empresas,
    rubros,
    loadingEmpresas,
    loadingCatalogs,
    activeTab,
    methods,
    filters,
    selectedCarga,
    totalErrores,
    totalRegistros,
    getError,
    hasError,
    setActiveTab,
    handleFieldChange,
    setFilterField,
    handleApplyFilters,
    handleResetFilters,
    resetUploadForm,
    handleSubmitUpload,
    handleApprove,
    handleDelete,
    handleSelectCarga,
    handlePageChange,
    handleRetry,
  } = useCargarubrosidoPageController();

  return (
    <PageShell
      title="Carga Masiva de Rubros IDO"
      description="Opera el ciclo completo de cargas masivas: selección de empresa y rubro, envío de archivo, revisión del historial, aprobación operativa y análisis de líneas procesadas."
      actions={
        <>
          <Button label="Refrescar historial" variant="secondary" onClick={() => void handleRetry()} />
          <Button label="Nueva carga" onClick={() => setActiveTab('cargas')} />
        </>
      }
    >
      {(error || catalogsError) ? (
        <ErrorBanner
          message={error ?? catalogsError ?? 'Error no identificado'}
          onRetry={() => void handleRetry()}
        />
      ) : null}

      <CargarubrosidoStats
        totalElements={totalElements}
        totalRegistros={totalRegistros}
        totalErrores={totalErrores}
      />

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'cargas' | 'detalle')}>
        <TabsList>
          <TabsTrigger value="cargas">Carga y seguimiento</TabsTrigger>
          <TabsTrigger value="detalle" disabled={!selectedCarga}>Detalle de líneas</TabsTrigger>
        </TabsList>

        <TabsContent value="cargas">
          <div className="flex flex-col gap-6 max-w-full">
            <CargarubrosidoForm
              methods={methods}
              empresas={empresas}
              rubros={rubros}
              loading={loading}
              loadingEmpresas={loadingEmpresas}
              loadingCatalogs={loadingCatalogs}
              getError={getError}
              hasError={hasError}
              onFieldChange={handleFieldChange}
              onSubmit={handleSubmitUpload}
              onReset={resetUploadForm}
            />

            <CargarubrosidoList
              items={items}
              loading={loading}
              page={page}
              totalElements={totalElements}
              empresas={empresas}
              rubros={rubros}
              filters={filters}
              onFilterChange={setFilterField}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
              onPageChange={(nextPage) => void handlePageChange(nextPage)}
              onSelectCarga={handleSelectCarga}
              onApprove={(itemId) => void handleApprove(itemId)}
              onDelete={(itemId) => void handleDelete(itemId)}
            />
          </div>
        </TabsContent>

        <TabsContent value="detalle">
          <CargarubrosidoDetail
            selectedCarga={selectedCarga}
            lineas={lineas}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </PageShell>
  );
};
