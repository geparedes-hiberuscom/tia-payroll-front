/**
 * Constantes de rutas — evitar hardcoded strings en navegación.
 * Usar con useNavigate(): navigate(ROUTES.MY_FUNC_LIST)
 */
export const ROUTES = {
  HOME: '/',
  SETUP: '/setup',
  RUBROS: '/rubros',
  PROCESOS: '/procesos',
  CONSULTAS: '/consultas',
  PAGO: '/pago',
  PRESTAMOS: '/prestamos',
  COSTOS: '/costos',
  BENEFICIOS: '/beneficios',
  INTEGRACIONES: '/integraciones',
  REPORTES: '/reportes',
} as const;
