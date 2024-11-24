export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true';

export const NEXT_PUBLIC_TMDB_IMAGE_URL =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_URL ?? '';
