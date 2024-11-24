import * as React from 'react';

import { generateMetadata } from '@/lib/seo';

import Layout from '@/components/layout/Layout';

import MovieExplore from '@/app/components/MovieExplore';

export const metadata = generateMetadata({
  title: 'Explore',
  description: 'Explore page',
});

export default function ExplorePage() {
  return (
    <Layout>
      <main>
        <section>
          <div className='layout min-h-main py-4'>
            <MovieExplore />
          </div>
        </section>
      </main>
    </Layout>
  );
}
