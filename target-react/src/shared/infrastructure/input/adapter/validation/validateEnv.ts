const requiredEnvVars = ['VITE_API_BASE_URL'] as const;

export function validateEnv(): void {
  const missingVars = requiredEnvVars.filter((envVar) => {
    const value = import.meta.env[envVar];
    return typeof value !== 'string' || value.trim().length === 0;
  });

  if (missingVars.length > 0) {
    // Log only in development to avoid leaking operational details in production logs.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.warn(`[env] Variables faltantes: ${missingVars.join(', ')}`);
    }
  }
}
