import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ROUTES } from '../../routes';
import { RubrosIndexPage } from './infrastructure/input/adapter/pages/RubrosIndexPage';

const w = (el: React.ReactElement) => (
  <Suspense fallback={<Loading message="Cargando modulo..." />}>{el}</Suspense>
);


const RubrosRubrosdialogPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosRubrosdialogPage })));

const RubrosidocargaxprocesoPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidocargaxprocesoPage })));

const RubrosxprocesodialogPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosxprocesodialogPage })));

const RubrosidomainPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidomainPage })));

const ConsultarubrosidolistPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.ConsultarubrosidolistPage })));

const CargarubrosidoPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.CargarubrosidoPage })));

export const rubrosRoutes = [
  <Route key="rubros" path={ROUTES.RUBROS} element={w(<RubrosIndexPage />)} />,

  <Route key="rubros-rubrosdialog" path={ROUTES.PATHS['rubros-rubrosdialog']} element={w(<RubrosRubrosdialogPage />)} />,

  <Route key="rubrosidocargaxproceso" path={ROUTES.PATHS['rubrosidocargaxproceso']} element={w(<RubrosidocargaxprocesoPage />)} />,

  <Route key="rubrosxprocesodialog" path={ROUTES.PATHS['rubrosxprocesodialog']} element={w(<RubrosxprocesodialogPage />)} />,

  <Route key="rubrosidomain-rubrosidolist-rubrosidodetail" path={ROUTES.PATHS['rubrosidomain-rubrosidolist-rubrosidodetail']} element={w(<RubrosidomainPage />)} />,

  <Route key="consultarubrosidolist" path={ROUTES.PATHS['consultarubrosidolist']} element={w(<ConsultarubrosidolistPage />)} />,

  <Route key="cargarubrosido" path={ROUTES.PATHS['cargarubrosido']} element={w(<CargarubrosidoPage />)} />,
];
