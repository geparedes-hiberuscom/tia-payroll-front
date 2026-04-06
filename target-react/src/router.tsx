import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { SetupRoutes } from '@modules/setup/infrastructure/input/adapter/pages/SetupRoutes';

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

        <Route path="/setup/*" element={<SetupRoutes />} />
        <Route path="/rubros" element={<></>} />
        <Route path="/procesos" element={<></>} />
        <Route path="/consultas" element={<></>} />
        <Route path="/pago" element={<></>} />
        <Route path="/prestamos" element={<></>} />
        <Route path="/costos" element={<></>} />
        <Route path="/beneficios" element={<></>} />
        <Route path="/integraciones" element={<></>} />
        <Route path="/reportes" element={<></>} />

      {/* 404 */}
      <Route path="*" element={<div style={{ textAlign: 'center', padding: '4rem' }}><h1>404</h1><p>Página no encontrada</p></div>} />
    </Routes>
  );
};
