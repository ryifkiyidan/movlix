import * as React from 'react';

import { generateMetadata } from '@/lib/seo';

import Layout from '@/components/layout/Layout';

import MovieList from '@/app/components/MovieList';

export const metadata = generateMetadata({});

export default function MovieListPage() {
  return (
    <Layout>
      <main>
        <section>
          <div className='layout min-h-main py-4'>
            <MovieList />
          </div>
        </section>
      </main>
    </Layout>
  );
}
