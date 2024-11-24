import { Metadata } from 'next';

import { openGraph } from './helper';

const defaultMeta = {
  title: 'Movlix',
  siteName: 'Movlix',
  description: 'Movlix is a movie database website.',
  url: 'https://movlix.vercel.app',
  type: 'website' as const, // Specify a valid Open Graph type
  robots: 'follow, index',
  image: 'https://movlix.vercel.app/images/logo.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
  routerPath?: string;
} & Partial<typeof defaultMeta>;

export function generateMetadata({
  date,
  templateTitle,
  routerPath,
  ...props
}: SeoProps): Metadata {
  const meta = {
    ...defaultMeta,
    ...props,
  };

  const title = templateTitle
    ? `${templateTitle} | ${meta.siteName}`
    : meta.title;

  const openGraphImage = openGraph({
    description: meta.description,
    siteName: templateTitle ? meta.siteName : title,
    templateTitle,
  });

  return {
    title,
    description: meta.description,
    alternates: {
      canonical: `${meta.url}${routerPath ?? ''}`, // Use routerPath
    },
    openGraph: {
      title,
      description: meta.description,
      url: `${meta.url}${routerPath ?? ''}`, // Use routerPath
      siteName: meta.siteName,
      type: meta.type, // This is now strongly typed
      images: [
        {
          url: openGraphImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: meta.description,
      images: [openGraphImage],
    },
    robots: meta.robots,
    other: date
      ? {
          'article:published_time': date,
          'og:publish_date': date,
        }
      : {},
  };
}
