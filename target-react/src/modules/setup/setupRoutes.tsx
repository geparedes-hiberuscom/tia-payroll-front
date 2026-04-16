import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ROUTES } from '../../routes';

const w = (el: React.ReactElement) => (
  <Suspense fallback={<Loading message="Cargando modulo..." />}>{el}</Suspense>
);

// Parámetros
const ParametrosParametrosdialogPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ParametrosParametrosdialogPage })));
const ParametrosParametrosdialogCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ParametrosParametrosdialogCreatePage })));
const ParametrosParametrosdialogDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ParametrosParametrosdialogDetailPage })));

// Contrato Plantilla
const ContratoplantillaContratoplantilladialogPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ContratoplantillaContratoplantilladialogPage })));
const ContratoplantillaContratoplantilladialogCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ContratoplantillaContratoplantilladialogCreatePage })));
const ContratoplantillaContratoplantilladialogDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ContratoplantillaContratoplantilladialogDetailPage })));

// Gastos Personales
const GastospersonalesdialogPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GastospersonalesdialogPage })));
const GastospersonalesdialogCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GastospersonalesdialogCreatePage })));
const GastospersonalesdialogDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GastospersonalesdialogDetailPage })));

// Gening Proyectados
const GeningproyectadosPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GeningproyectadosPage })));
const GeningproyectadosCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GeningproyectadosCreatePage })));
const GeningproyectadosDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GeningproyectadosDetailPage })));

// Reporte Irinec
const ReporteirinecdialogPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ReporteirinecdialogPage })));
const ReporteirinecdialogCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ReporteirinecdialogCreatePage })));
const ReporteirinecdialogDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.ReporteirinecdialogDetailPage })));

// Plantilla Contable
const PlantillacontablePlantillacontabledialogPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.PlantillacontablePlantillacontabledialogPage })));
const PlantillacontablePlantillacontabledialogCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.PlantillacontablePlantillacontabledialogCreatePage })));
const PlantillacontablePlantillacontabledialogDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.PlantillacontablePlantillacontabledialogDetailPage })));

// Rubro Plantilla Contable
const RubroplantillacontabledialogPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubroplantillacontabledialogPage })));
const RubroplantillacontabledialogCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubroplantillacontabledialogCreatePage })));
const RubroplantillacontabledialogDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubroplantillacontabledialogDetailPage })));

// Gestion Tabla IR
const GestiontablairGestiontablairdialogPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GestiontablairGestiontablairdialogPage })));
const GestiontablairGestiontablairdialogCreatePage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GestiontablairGestiontablairdialogCreatePage })));
const GestiontablairGestiontablairdialogDetailPage = lazy(() => import('@modules/setup/infrastructure/input/adapter/pages').then((m) => ({ default: m.GestiontablairGestiontablairdialogDetailPage })));

export const setupRoutes = [
  // Parámetros
  <Route key="parametros-parametrosdialog" path={ROUTES.PATHS['parametros-parametrosdialog']} element={w(<ParametrosParametrosdialogPage />)} />,
  <Route key="parametros-parametrosdialog-create" path={ROUTES.PATHS['parametros-parametrosdialog'] + '/create'} element={w(<ParametrosParametrosdialogCreatePage />)} />,
  <Route key="parametros-parametrosdialog-detail" path={ROUTES.PATHS['parametros-parametrosdialog'] + '/:id'} element={w(<ParametrosParametrosdialogDetailPage />)} />,
  <Route key="parametros-parametrosdialog-edit" path={ROUTES.PATHS['parametros-parametrosdialog'] + '/:id/edit'} element={w(<ParametrosParametrosdialogCreatePage />)} />,

  // Contrato Plantilla
  <Route key="contratoplantilla-contratoplantilladialog" path={ROUTES.PATHS['contratoplantilla-contratoplantilladialog']} element={w(<ContratoplantillaContratoplantilladialogPage />)} />,
  <Route key="contratoplantilla-contratoplantilladialog-create" path={ROUTES.PATHS['contratoplantilla-contratoplantilladialog'] + '/create'} element={w(<ContratoplantillaContratoplantilladialogCreatePage />)} />,
  <Route key="contratoplantilla-contratoplantilladialog-detail" path={ROUTES.PATHS['contratoplantilla-contratoplantilladialog'] + '/:id'} element={w(<ContratoplantillaContratoplantilladialogDetailPage />)} />,
  <Route key="contratoplantilla-contratoplantilladialog-edit" path={ROUTES.PATHS['contratoplantilla-contratoplantilladialog'] + '/:id/edit'} element={w(<ContratoplantillaContratoplantilladialogCreatePage />)} />,

  // Gastos Personales
  <Route key="gastospersonalesdialog" path={ROUTES.PATHS['gastospersonalesdialog']} element={w(<GastospersonalesdialogPage />)} />,
  <Route key="gastospersonalesdialog-create" path={ROUTES.PATHS['gastospersonalesdialog'] + '/create'} element={w(<GastospersonalesdialogCreatePage />)} />,
  <Route key="gastospersonalesdialog-detail" path={ROUTES.PATHS['gastospersonalesdialog'] + '/:id'} element={w(<GastospersonalesdialogDetailPage />)} />,
  <Route key="gastospersonalesdialog-edit" path={ROUTES.PATHS['gastospersonalesdialog'] + '/:id/edit'} element={w(<GastospersonalesdialogCreatePage />)} />,

  // Gening Proyectados
  <Route key="geningproyectados" path={ROUTES.PATHS['geningproyectados']} element={w(<GeningproyectadosPage />)} />,
  <Route key="geningproyectados-create" path={ROUTES.PATHS['geningproyectados'] + '/create'} element={w(<GeningproyectadosCreatePage />)} />,
  <Route key="geningproyectados-detail" path={ROUTES.PATHS['geningproyectados'] + '/:id'} element={w(<GeningproyectadosDetailPage />)} />,
  <Route key="geningproyectados-edit" path={ROUTES.PATHS['geningproyectados'] + '/:id/edit'} element={w(<GeningproyectadosCreatePage />)} />,

  // Reporte Irinec
  <Route key="reporteirinecdialog" path={ROUTES.PATHS['reporteirinecdialog']} element={w(<ReporteirinecdialogPage />)} />,
  <Route key="reporteirinecdialog-create" path={ROUTES.PATHS['reporteirinecdialog'] + '/create'} element={w(<ReporteirinecdialogCreatePage />)} />,
  <Route key="reporteirinecdialog-detail" path={ROUTES.PATHS['reporteirinecdialog'] + '/:id'} element={w(<ReporteirinecdialogDetailPage />)} />,
  <Route key="reporteirinecdialog-edit" path={ROUTES.PATHS['reporteirinecdialog'] + '/:id/edit'} element={w(<ReporteirinecdialogCreatePage />)} />,

  // Plantilla Contable
  <Route key="plantillacontable-plantillacontabledialog" path={ROUTES.PATHS['plantillacontable-plantillacontabledialog']} element={w(<PlantillacontablePlantillacontabledialogPage />)} />,
  <Route key="plantillacontable-plantillacontabledialog-create" path={ROUTES.PATHS['plantillacontable-plantillacontabledialog'] + '/create'} element={w(<PlantillacontablePlantillacontabledialogCreatePage />)} />,
  <Route key="plantillacontable-plantillacontabledialog-detail" path={ROUTES.PATHS['plantillacontable-plantillacontabledialog'] + '/:id'} element={w(<PlantillacontablePlantillacontabledialogDetailPage />)} />,
  <Route key="plantillacontable-plantillacontabledialog-edit" path={ROUTES.PATHS['plantillacontable-plantillacontabledialog'] + '/:id/edit'} element={w(<PlantillacontablePlantillacontabledialogCreatePage />)} />,

  // Rubro Plantilla Contable
  <Route key="rubroplantillacontabledialog" path={ROUTES.PATHS['rubroplantillacontabledialog']} element={w(<RubroplantillacontabledialogPage />)} />,
  <Route key="rubroplantillacontabledialog-create" path={ROUTES.PATHS['rubroplantillacontabledialog'] + '/create'} element={w(<RubroplantillacontabledialogCreatePage />)} />,
  <Route key="rubroplantillacontabledialog-detail" path={ROUTES.PATHS['rubroplantillacontabledialog'] + '/:id'} element={w(<RubroplantillacontabledialogDetailPage />)} />,
  <Route key="rubroplantillacontabledialog-edit" path={ROUTES.PATHS['rubroplantillacontabledialog'] + '/:id/edit'} element={w(<RubroplantillacontabledialogCreatePage />)} />,

  // Gestion Tabla IR
  <Route key="gestiontablair-gestiontablairdialog" path={ROUTES.PATHS['gestiontablair-gestiontablairdialog']} element={w(<GestiontablairGestiontablairdialogPage />)} />,
  <Route key="gestiontablair-gestiontablairdialog-create" path={ROUTES.PATHS['gestiontablair-gestiontablairdialog'] + '/create'} element={w(<GestiontablairGestiontablairdialogCreatePage />)} />,
  <Route key="gestiontablair-gestiontablairdialog-detail" path={ROUTES.PATHS['gestiontablair-gestiontablairdialog'] + '/:id'} element={w(<GestiontablairGestiontablairdialogDetailPage />)} />,
  <Route key="gestiontablair-gestiontablairdialog-edit" path={ROUTES.PATHS['gestiontablair-gestiontablairdialog'] + '/:id/edit'} element={w(<GestiontablairGestiontablairdialogCreatePage />)} />,
];
