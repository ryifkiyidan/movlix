import * as React from 'react';

import { generateMetadata } from '@/lib/seo';

import Layout from '@/components/layout/Layout';

import MovieDetail from '@/app/components/MovieDetail';

export const metadata = generateMetadata({});

export default async function MovieDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  return (
    <Layout>
      <main>
        <section>
          <div className='layout min-h-main'>
            <MovieDetail id={id} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
