import React from 'react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import List from '@/app/components/MovieList/List';
import PaginationController from '@/app/components/MovieList/PaginationController';

import { MovieList } from '@/types/movie';

function NowPlayingSection() {
  const { ref, query: moviesQuery } = useInfiniteScroll<MovieList>({
    queryKey: ['now_playing'],
    url: '/movie/now_playing',
  });

  const data = moviesQuery.data?.pages.flatMap((page) => page.results);

  return (
    <section className='w-full'>
      <List
        isError={moviesQuery.isError}
        isLoading={moviesQuery.isLoading}
        isEmpty={!data?.length}
        data={data}
        onRetryClick={moviesQuery.refetch}
      />

      <PaginationController
        ref={ref}
        isFetchingNextPage={moviesQuery.isFetchingNextPage}
      />
    </section>
  );
}

export default NowPlayingSection;
