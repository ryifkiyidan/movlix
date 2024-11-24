import { Siren } from 'lucide-react';
import * as React from 'react';

import { generateMetadata } from '@/lib/seo';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Typography from '@/components/typography/Typography';

import { NAVIGATION } from '@/constant/navigation';

export const metadata = generateMetadata({
  title: '404: Page Not Found',
  description: 'Page Not Found',
});

export default function NotFoundPage() {
  return (
    <Layout>
      <main>
        <section className='bg-dark'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-dark-text'>
            <Siren
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <Typography className='mt-4' as='h1' variant='j1'>
              Page Not Found
            </Typography>
            <Typography className='mt-4' variant='b1'>
              <ArrowLink href={NAVIGATION.movie}>Back to Home</ArrowLink>
            </Typography>
          </div>
        </section>
      </main>
    </Layout>
  );
}
