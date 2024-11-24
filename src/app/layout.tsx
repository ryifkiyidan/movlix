import '@/styles/globals.css';

import { RootProvider } from '@/components/providers/RootProvider';

const fonts = [
  '/fonts/inter-var-latin.woff2',
  '/fonts/AvertaStd/AvertaStd-Regular.woff2',
  '/fonts/AvertaStd/AvertaStd-RegularItalic.woff2',
  '/fonts/AvertaStd/AvertaStd-Semibold.woff2',
  '/fonts/AvertaStd/AvertaStd-SemiboldItalic.woff2',
  '/fonts/AvertaStd/AvertaStd-Bold.woff2',
  '/fonts/AvertaStd/AvertaStd-BoldItalic.woff2',
];

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark bg-dark text-white'>
      <head>
        {fonts.map((font) => (
          <link
            key={font}
            rel='preload'
            href={font}
            as='font'
            type='font/woff2'
            crossOrigin='anonymous'
          />
        ))}
        <link
          rel='icon'
          type='image/png'
          href='/favicon/favicon-96x96.png'
          sizes='96x96'
        />
        <link rel='icon' type='image/svg+xml' href='/favicon/favicon.svg' />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <meta name='apple-mobile-web-app-title' content='Movlix' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

export default RootLayout;
