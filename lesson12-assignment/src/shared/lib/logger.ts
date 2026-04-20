export const logger = {
  log(...args: unknown[]) {
    console.log('[log]', ...args);
  },

  error(message: string, error?: unknown) {
    console.error('[error]', message, error);
  },
};