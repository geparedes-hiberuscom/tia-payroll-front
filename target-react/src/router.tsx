import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';

// ─── Lazy imports (code splitting per page) ───


/**
 * AppRouter — Rutas principales de la aplicación
 * Generado automáticamente desde los Vertical Slices y funcionalidades.
 *
 * Cada funcionalidad tiene rutas:
 *   /{funcionalidad}           → Lista (Page principal)
 *   /{funcionalidad}/create    → Formulario crear
 *   /{funcionalidad}/:id       → Detalle
 *   /{funcionalidad}/:id/edit  → Formulario editar
 */
export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/setup" replace />} />

        <Route path="/setup" element={<SetupPage />} />
        <Route path="/rubros" element={<RubrosPage />} />
        <Route path="/procesos" element={<ProcesosPage />} />
        <Route path="/consultas" element={<ConsultasPage />} />
        <Route path="/pago" element={<PagoPage />} />
        <Route path="/prestamos" element={<PrestamosPage />} />
        <Route path="/costos" element={<CostosPage />} />
        <Route path="/beneficios" element={<BeneficiosPage />} />
        <Route path="/integraciones" element={<IntegracionesPage />} />
        <Route path="/reportes" element={<ReportesPage />} />

      {/* 404 */}
      <Route path="*" element={<div style={{ textAlign: 'center', padding: '4rem' }}><h1>404</h1><p>Página no encontrada</p></div>} />
    </Routes>
  );
};
