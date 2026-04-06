/**
 * Validación de variables de entorno.
 * Importar al inicio de la app para fallar rápido si falta configuración.
 */

interface EnvConfig {
  API_BASE_URL: string;
  APP_NAME: string;
  NODE_ENV: string;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[`VITE_${key}`] || defaultValue;
  if (!value) {
    console.error(`⚠️ Variable de entorno VITE_${key} no definida`);
    if (import.meta.env.PROD) {
      throw new Error(`Missing env variable: VITE_${key}`);
    }
  }
  return value || '';
}

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar('API_BASE_URL', 'http://localhost:8080/api'),
  APP_NAME: getEnvVar('APP_NAME', 'Migration App'),
  NODE_ENV: import.meta.env.MODE || 'development',
};

/**
 * Valida que todas las variables de entorno requeridas estén definidas.
 * Llamar en main.tsx antes de renderizar.
 */
export function validateEnv(): { valid: boolean; missing: string[] } {
  const required = ['API_BASE_URL'];
  const missing: string[] = [];

  for (const key of required) {
    if (!import.meta.env[`VITE_${key}`]) {
      missing.push(`VITE_${key}`);
    }
  }

  if (missing.length > 0) {
    console.warn('⚠️ Variables de entorno faltantes:', missing.join(', '));
    console.warn('Crear archivo .env con estas variables (ver .env.example)');
  }

  return { valid: missing.length === 0, missing };
}
