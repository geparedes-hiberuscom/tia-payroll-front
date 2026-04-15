/**
 * Constantes de rutas — evitar hardcoded strings en navegación.
 * Usar con useNavigate(): navigate(ROUTES.MY_FUNC_LIST)
 */
export const ROUTES = {
  HOME: '/',
  SETUP: '/setup',
  UIKIT_DEMO: '/uikit-demo',
  RUBROS: '/rubros',
  PROCESOS: '/procesos',
  CONSULTAS: '/consultas',
  PAGO: '/pago',
  PRESTAMOS: '/prestamos',
  COSTOS: '/costos',
  BENEFICIOS: '/beneficios',
  INTEGRACIONES: '/integraciones',
  REPORTES: '/reportes',
  PATHS: {
    cargarubrosido: '/cargarubrosido',
    consultarubrosidolist: '/consultarubrosidolist',
    ejecucionbot: '/ejecucionbot',
    ejecucionproccierre: '/ejecucionproccierre',
    'instanciasprocesos-instanciasprocesosdialog': '/instanciasprocesos-instanciasprocesosdialog',
    logderegistrosdeprocesosubrecurso: '/logderegistrosdeprocesosubrecurso',
    'procesos-procesosdialog': '/procesos-procesosdialog',
    procesosejecabrirlq: '/procesosejecabrirlq',
    procesosejecaprobarlq: '/procesosejecaprobarlq',
    procesosejeccolaboradores: '/procesosejeccolaboradores',
    'procesosejecucion-procesosejecdialog': '/procesosejecucion-procesosejecdialog',
    'procesosejecucionreversion-procesosejecucionreversiondialog': '/procesosejecucionreversion-procesosejecucionreversiondialog',
    'rubros-rubrosdialog': '/rubros-rubrosdialog',
    rubrosidocargaxproceso: '/rubrosidocargaxproceso',
    'rubrosidomain-rubrosidolist-rubrosidodetail': '/rubrosidomain-rubrosidolist-rubrosidodetail',
    rubrospreliquidadossubrecurso: '/rubrospreliquidadossubrecurso',
    rubrosxprocesodialog: '/rubrosxprocesodialog',
    sobregiroshistricossubrecurso: '/sobregiroshistricossubrecurso',
  },
} as const;
