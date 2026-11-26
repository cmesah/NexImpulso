export const isPreview = import.meta.env.DEV ||
  Boolean(process.env.CONTEXT && process.env.CONTEXT !== 'production');
