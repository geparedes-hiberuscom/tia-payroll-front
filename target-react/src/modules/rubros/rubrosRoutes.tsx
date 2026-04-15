import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ROUTES } from '../../routes';

const w = (el: React.ReactElement) => (
  <Suspense fallback={<Loading message="Cargando modulo..." />}>{el}</Suspense>
);

const RubrosPage = lazy(() => import('@modules/rubros').then((m) => ({ default: m.RubrosPage })));

const RubrosRubrosdialogPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosRubrosdialogPage })));
const RubrosRubrosdialogCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosRubrosdialogCreatePage })));
const RubrosRubrosdialogDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosRubrosdialogDetailPage })));

const RubrosidocargaxprocesoPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidocargaxprocesoPage })));
const RubrosidocargaxprocesoCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidocargaxprocesoCreatePage })));
const RubrosidocargaxprocesoDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidocargaxprocesoDetailPage })));

const RubrosxprocesodialogPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosxprocesodialogPage })));
const RubrosxprocesodialogCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosxprocesodialogCreatePage })));
const RubrosxprocesodialogDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosxprocesodialogDetailPage })));

const RubrosidomainRubrosidolistRubrosidodetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidomainRubrosidolistRubrosidodetailPage })));
const RubrosidomainRubrosidolistRubrosidodetailCreatePage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidomainRubrosidolistRubrosidodetailCreatePage })));
const RubrosidomainRubrosidolistRubrosidodetailDetailPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrosidomainRubrosidolistRubrosidodetailDetailPage })));

const ConsultarubrosidolistPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.ConsultarubrosidolistPage })));

const CargarubrosidoPage = lazy(() => import('@modules/rubros/infrastructure/input/adapter/pages').then((m) => ({ default: m.CargarubrosidoPage })));

export const rubrosRoutes = [
  <Route key="rubros" path={ROUTES.RUBROS} element={w(<RubrosPage />)} />,

  <Route key="rubros-rubrosdialog" path={ROUTES.PATHS['rubros-rubrosdialog']} element={w(<RubrosRubrosdialogPage />)} />,
  <Route key="rubros-rubrosdialog-create" path={ROUTES.PATHS['rubros-rubrosdialog'] + '/create'} element={w(<RubrosRubrosdialogCreatePage />)} />,
  <Route key="rubros-rubrosdialog-detail" path={ROUTES.PATHS['rubros-rubrosdialog'] + '/:id'} element={w(<RubrosRubrosdialogDetailPage />)} />,
  <Route key="rubros-rubrosdialog-edit" path={ROUTES.PATHS['rubros-rubrosdialog'] + '/:id/edit'} element={w(<RubrosRubrosdialogCreatePage />)} />,

  <Route key="rubrosidocargaxproceso" path={ROUTES.PATHS['rubrosidocargaxproceso']} element={w(<RubrosidocargaxprocesoPage />)} />,
  <Route key="rubrosidocargaxproceso-create" path={ROUTES.PATHS['rubrosidocargaxproceso'] + '/create'} element={w(<RubrosidocargaxprocesoCreatePage />)} />,
  <Route key="rubrosidocargaxproceso-detail" path={ROUTES.PATHS['rubrosidocargaxproceso'] + '/:id'} element={w(<RubrosidocargaxprocesoDetailPage />)} />,
  <Route key="rubrosidocargaxproceso-edit" path={ROUTES.PATHS['rubrosidocargaxproceso'] + '/:id/edit'} element={w(<RubrosidocargaxprocesoCreatePage />)} />,

  <Route key="rubrosxprocesodialog" path={ROUTES.PATHS['rubrosxprocesodialog']} element={w(<RubrosxprocesodialogPage />)} />,
  <Route key="rubrosxprocesodialog-create" path={ROUTES.PATHS['rubrosxprocesodialog'] + '/create'} element={w(<RubrosxprocesodialogCreatePage />)} />,
  <Route key="rubrosxprocesodialog-detail" path={ROUTES.PATHS['rubrosxprocesodialog'] + '/:id'} element={w(<RubrosxprocesodialogDetailPage />)} />,
  <Route key="rubrosxprocesodialog-edit" path={ROUTES.PATHS['rubrosxprocesodialog'] + '/:id/edit'} element={w(<RubrosxprocesodialogCreatePage />)} />,

  <Route key="rubrosidomain-rubrosidolist-rubrosidodetail" path={ROUTES.PATHS['rubrosidomain-rubrosidolist-rubrosidodetail']} element={w(<RubrosidomainRubrosidolistRubrosidodetailPage />)} />,
  <Route key="rubrosidomain-rubrosidolist-rubrosidodetail-create" path={ROUTES.PATHS['rubrosidomain-rubrosidolist-rubrosidodetail'] + '/create'} element={w(<RubrosidomainRubrosidolistRubrosidodetailCreatePage />)} />,
  <Route key="rubrosidomain-rubrosidolist-rubrosidodetail-detail" path={ROUTES.PATHS['rubrosidomain-rubrosidolist-rubrosidodetail'] + '/:id'} element={w(<RubrosidomainRubrosidolistRubrosidodetailDetailPage />)} />,
  <Route key="rubrosidomain-rubrosidolist-rubrosidodetail-edit" path={ROUTES.PATHS['rubrosidomain-rubrosidolist-rubrosidodetail'] + '/:id/edit'} element={w(<RubrosidomainRubrosidolistRubrosidodetailCreatePage />)} />,

  <Route key="consultarubrosidolist" path={ROUTES.PATHS['consultarubrosidolist']} element={w(<ConsultarubrosidolistPage />)} />,

  <Route key="cargarubrosido" path={ROUTES.PATHS['cargarubrosido']} element={w(<CargarubrosidoPage />)} />,
];
