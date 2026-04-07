import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Loading } from '@shared/infrastructure/input/adapter/components/Loading';
import { ROUTES } from '../../routes';

const w = (el: React.ReactElement) => (
  <Suspense fallback={<Loading message="Cargando modulo..." />}>{el}</Suspense>
);

const ProcesosPage = lazy(() => import('@modules/procesos').then((m) => ({ default: m.ProcesosPage })));

const EjecucionbotPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.EjecucionbotPage })));
const EjecucionbotCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.EjecucionbotCreatePage })));
const EjecucionbotDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.EjecucionbotDetailPage })));

const EjecucionproccierrePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.EjecucionproccierrePage })));
const EjecucionproccierreCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.EjecucionproccierreCreatePage })));
const EjecucionproccierreDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.EjecucionproccierreDetailPage })));

const InstanciasprocesosInstanciasprocesosdialogPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.InstanciasprocesosInstanciasprocesosdialogPage })));
const InstanciasprocesosInstanciasprocesosdialogCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.InstanciasprocesosInstanciasprocesosdialogCreatePage })));
const InstanciasprocesosInstanciasprocesosdialogDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.InstanciasprocesosInstanciasprocesosdialogDetailPage })));

const LogderegistrosdeprocesosubrecursoPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.LogderegistrosdeprocesosubrecursoPage })));
const LogderegistrosdeprocesosubrecursoCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.LogderegistrosdeprocesosubrecursoCreatePage })));
const LogderegistrosdeprocesosubrecursoDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.LogderegistrosdeprocesosubrecursoDetailPage })));

const ProcesosProcesosdialogPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosProcesosdialogPage })));
const ProcesosProcesosdialogCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosProcesosdialogCreatePage })));
const ProcesosProcesosdialogDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosProcesosdialogDetailPage })));

const ProcesosejecabrirlqPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecabrirlqPage })));
const ProcesosejecabrirlqCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecabrirlqCreatePage })));
const ProcesosejecabrirlqDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecabrirlqDetailPage })));

const ProcesosejecaprobarlqPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecaprobarlqPage })));
const ProcesosejecaprobarlqCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecaprobarlqCreatePage })));
const ProcesosejecaprobarlqDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecaprobarlqDetailPage })));

const ProcesosejeccolaboradoresPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejeccolaboradoresPage })));
const ProcesosejeccolaboradoresCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejeccolaboradoresCreatePage })));
const ProcesosejeccolaboradoresDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejeccolaboradoresDetailPage })));

const ProcesosejecucionProcesosejecdialogPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecucionProcesosejecdialogPage })));
const ProcesosejecucionProcesosejecdialogCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecucionProcesosejecdialogCreatePage })));
const ProcesosejecucionProcesosejecdialogDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecucionProcesosejecdialogDetailPage })));

const ProcesosejecucionreversionProcesosejecucionreversiondialogPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecucionreversionProcesosejecucionreversiondialogPage })));
const ProcesosejecucionreversionProcesosejecucionreversiondialogCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecucionreversionProcesosejecucionreversiondialogCreatePage })));
const ProcesosejecucionreversionProcesosejecucionreversiondialogDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.ProcesosejecucionreversionProcesosejecucionreversiondialogDetailPage })));

const RubrospreliquidadossubrecursoPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrospreliquidadossubrecursoPage })));
const RubrospreliquidadossubrecursoCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrospreliquidadossubrecursoCreatePage })));
const RubrospreliquidadossubrecursoDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.RubrospreliquidadossubrecursoDetailPage })));

const SobregiroshistricossubrecursoPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.SobregiroshistricossubrecursoPage })));
const SobregiroshistricossubrecursoCreatePage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.SobregiroshistricossubrecursoCreatePage })));
const SobregiroshistricossubrecursoDetailPage = lazy(() => import('@modules/procesos/infrastructure/input/adapter/pages').then((m) => ({ default: m.SobregiroshistricossubrecursoDetailPage })));

export const procesosRoutes = [
  <Route key="procesos" path={ROUTES.PROCESOS} element={w(<ProcesosPage />)} />,

  <Route key="ejecucionbot" path={ROUTES.PATHS['ejecucionbot']} element={w(<EjecucionbotPage />)} />,
  <Route key="ejecucionbot-create" path={ROUTES.PATHS['ejecucionbot'] + '/create'} element={w(<EjecucionbotCreatePage />)} />,
  <Route key="ejecucionbot-detail" path={ROUTES.PATHS['ejecucionbot'] + '/:id'} element={w(<EjecucionbotDetailPage />)} />,
  <Route key="ejecucionbot-edit" path={ROUTES.PATHS['ejecucionbot'] + '/edit/:id'} element={w(<EjecucionbotCreatePage />)} />,

  <Route key="ejecucionproccierre" path={ROUTES.PATHS['ejecucionproccierre']} element={w(<EjecucionproccierrePage />)} />,
  <Route key="ejecucionproccierre-create" path={ROUTES.PATHS['ejecucionproccierre'] + '/create'} element={w(<EjecucionproccierreCreatePage />)} />,
  <Route key="ejecucionproccierre-detail" path={ROUTES.PATHS['ejecucionproccierre'] + '/:id'} element={w(<EjecucionproccierreDetailPage />)} />,
  <Route key="ejecucionproccierre-edit" path={ROUTES.PATHS['ejecucionproccierre'] + '/edit/:id'} element={w(<EjecucionproccierreCreatePage />)} />,

  <Route key="instanciasprocesos-instanciasprocesosdialog" path={ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog']} element={w(<InstanciasprocesosInstanciasprocesosdialogPage />)} />,
  <Route key="instanciasprocesos-instanciasprocesosdialog-create" path={ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog'] + '/create'} element={w(<InstanciasprocesosInstanciasprocesosdialogCreatePage />)} />,
  <Route key="instanciasprocesos-instanciasprocesosdialog-detail" path={ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog'] + '/:id'} element={w(<InstanciasprocesosInstanciasprocesosdialogDetailPage />)} />,
  <Route key="instanciasprocesos-instanciasprocesosdialog-edit" path={ROUTES.PATHS['instanciasprocesos-instanciasprocesosdialog'] + '/edit/:id'} element={w(<InstanciasprocesosInstanciasprocesosdialogCreatePage />)} />,

  <Route key="logderegistrosdeprocesosubrecurso" path={ROUTES.PATHS['logderegistrosdeprocesosubrecurso']} element={w(<LogderegistrosdeprocesosubrecursoPage />)} />,
  <Route key="logderegistrosdeprocesosubrecurso-create" path={ROUTES.PATHS['logderegistrosdeprocesosubrecurso'] + '/create'} element={w(<LogderegistrosdeprocesosubrecursoCreatePage />)} />,
  <Route key="logderegistrosdeprocesosubrecurso-detail" path={ROUTES.PATHS['logderegistrosdeprocesosubrecurso'] + '/:id'} element={w(<LogderegistrosdeprocesosubrecursoDetailPage />)} />,
  <Route key="logderegistrosdeprocesosubrecurso-edit" path={ROUTES.PATHS['logderegistrosdeprocesosubrecurso'] + '/edit/:id'} element={w(<LogderegistrosdeprocesosubrecursoCreatePage />)} />,

  <Route key="procesos-procesosdialog" path={ROUTES.PATHS['procesos-procesosdialog']} element={w(<ProcesosProcesosdialogPage />)} />,
  <Route key="procesos-procesosdialog-create" path={ROUTES.PATHS['procesos-procesosdialog'] + '/create'} element={w(<ProcesosProcesosdialogCreatePage />)} />,
  <Route key="procesos-procesosdialog-detail" path={ROUTES.PATHS['procesos-procesosdialog'] + '/:id'} element={w(<ProcesosProcesosdialogDetailPage />)} />,
  <Route key="procesos-procesosdialog-edit" path={ROUTES.PATHS['procesos-procesosdialog'] + '/edit/:id'} element={w(<ProcesosProcesosdialogCreatePage />)} />,

  <Route key="procesosejecabrirlq" path={ROUTES.PATHS['procesosejecabrirlq']} element={w(<ProcesosejecabrirlqPage />)} />,
  <Route key="procesosejecabrirlq-create" path={ROUTES.PATHS['procesosejecabrirlq'] + '/create'} element={w(<ProcesosejecabrirlqCreatePage />)} />,
  <Route key="procesosejecabrirlq-detail" path={ROUTES.PATHS['procesosejecabrirlq'] + '/:id'} element={w(<ProcesosejecabrirlqDetailPage />)} />,
  <Route key="procesosejecabrirlq-edit" path={ROUTES.PATHS['procesosejecabrirlq'] + '/edit/:id'} element={w(<ProcesosejecabrirlqCreatePage />)} />,

  <Route key="procesosejecaprobarlq" path={ROUTES.PATHS['procesosejecaprobarlq']} element={w(<ProcesosejecaprobarlqPage />)} />,
  <Route key="procesosejecaprobarlq-create" path={ROUTES.PATHS['procesosejecaprobarlq'] + '/create'} element={w(<ProcesosejecaprobarlqCreatePage />)} />,
  <Route key="procesosejecaprobarlq-detail" path={ROUTES.PATHS['procesosejecaprobarlq'] + '/:id'} element={w(<ProcesosejecaprobarlqDetailPage />)} />,
  <Route key="procesosejecaprobarlq-edit" path={ROUTES.PATHS['procesosejecaprobarlq'] + '/edit/:id'} element={w(<ProcesosejecaprobarlqCreatePage />)} />,

  <Route key="procesosejeccolaboradores" path={ROUTES.PATHS['procesosejeccolaboradores']} element={w(<ProcesosejeccolaboradoresPage />)} />,
  <Route key="procesosejeccolaboradores-create" path={ROUTES.PATHS['procesosejeccolaboradores'] + '/create'} element={w(<ProcesosejeccolaboradoresCreatePage />)} />,
  <Route key="procesosejeccolaboradores-detail" path={ROUTES.PATHS['procesosejeccolaboradores'] + '/:id'} element={w(<ProcesosejeccolaboradoresDetailPage />)} />,
  <Route key="procesosejeccolaboradores-edit" path={ROUTES.PATHS['procesosejeccolaboradores'] + '/edit/:id'} element={w(<ProcesosejeccolaboradoresCreatePage />)} />,

  <Route key="procesosejecucion-procesosejecdialog" path={ROUTES.PATHS['procesosejecucion-procesosejecdialog']} element={w(<ProcesosejecucionProcesosejecdialogPage />)} />,
  <Route key="procesosejecucion-procesosejecdialog-create" path={ROUTES.PATHS['procesosejecucion-procesosejecdialog'] + '/create'} element={w(<ProcesosejecucionProcesosejecdialogCreatePage />)} />,
  <Route key="procesosejecucion-procesosejecdialog-detail" path={ROUTES.PATHS['procesosejecucion-procesosejecdialog'] + '/:id'} element={w(<ProcesosejecucionProcesosejecdialogDetailPage />)} />,
  <Route key="procesosejecucion-procesosejecdialog-edit" path={ROUTES.PATHS['procesosejecucion-procesosejecdialog'] + '/edit/:id'} element={w(<ProcesosejecucionProcesosejecdialogCreatePage />)} />,

  <Route key="procesosejecucionreversion-procesosejecucionreversiondialog" path={ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog']} element={w(<ProcesosejecucionreversionProcesosejecucionreversiondialogPage />)} />,
  <Route key="procesosejecucionreversion-procesosejecucionreversiondialog-create" path={ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog'] + '/create'} element={w(<ProcesosejecucionreversionProcesosejecucionreversiondialogCreatePage />)} />,
  <Route key="procesosejecucionreversion-procesosejecucionreversiondialog-detail" path={ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog'] + '/:id'} element={w(<ProcesosejecucionreversionProcesosejecucionreversiondialogDetailPage />)} />,
  <Route key="procesosejecucionreversion-procesosejecucionreversiondialog-edit" path={ROUTES.PATHS['procesosejecucionreversion-procesosejecucionreversiondialog'] + '/edit/:id'} element={w(<ProcesosejecucionreversionProcesosejecucionreversiondialogCreatePage />)} />,

  <Route key="rubrospreliquidadossubrecurso" path={ROUTES.PATHS['rubrospreliquidadossubrecurso']} element={w(<RubrospreliquidadossubrecursoPage />)} />,
  <Route key="rubrospreliquidadossubrecurso-create" path={ROUTES.PATHS['rubrospreliquidadossubrecurso'] + '/create'} element={w(<RubrospreliquidadossubrecursoCreatePage />)} />,
  <Route key="rubrospreliquidadossubrecurso-detail" path={ROUTES.PATHS['rubrospreliquidadossubrecurso'] + '/:id'} element={w(<RubrospreliquidadossubrecursoDetailPage />)} />,
  <Route key="rubrospreliquidadossubrecurso-edit" path={ROUTES.PATHS['rubrospreliquidadossubrecurso'] + '/edit/:id'} element={w(<RubrospreliquidadossubrecursoCreatePage />)} />,

  <Route key="sobregiroshistricossubrecurso" path={ROUTES.PATHS['sobregiroshistricossubrecurso']} element={w(<SobregiroshistricossubrecursoPage />)} />,
  <Route key="sobregiroshistricossubrecurso-create" path={ROUTES.PATHS['sobregiroshistricossubrecurso'] + '/create'} element={w(<SobregiroshistricossubrecursoCreatePage />)} />,
  <Route key="sobregiroshistricossubrecurso-detail" path={ROUTES.PATHS['sobregiroshistricossubrecurso'] + '/:id'} element={w(<SobregiroshistricossubrecursoDetailPage />)} />,
  <Route key="sobregiroshistricossubrecurso-edit" path={ROUTES.PATHS['sobregiroshistricossubrecurso'] + '/edit/:id'} element={w(<SobregiroshistricossubrecursoCreatePage />)} />,
];
