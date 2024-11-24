'use client';

import React from 'react';

import clsxm from '@/lib/clsxm';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import MovieCard from '@/components/cards/MovieCard';
import Skeleton from '@/components/Skeleton';
import Slider from '@/components/Slider';
import Spinner from '@/components/Spinner';
import Typography from '@/components/typography/Typography';

import ErrorContent from '@/app/components/MessageContent/ErrorContent';
import NoMoviesContent from '@/app/components/MessageContent/NoMoviesContent';

import { MovieList } from '@/types/movie';

type SimilarsSectionProps = {
  id: number | undefined;
  className?: string;
};

function SimilarsSection({ id, className }: SimilarsSectionProps) {
  const { ref, query: moviesQuery } = useInfiniteScroll<MovieList>({
    queryKey: [id, 'similar'],
    url: `/movie/${id}/similar`,
  });

  const data = moviesQuery.data?.pages.flatMap((page) => page.results) ?? [];
  const { isLoading, isError, isFetchingNextPage, refetch } = moviesQuery;

  const sizeClass = 'w-[125px] aspect-[2/3]';

  return (
    <section
      className={clsxm(
        'w-full h-full bg-dark-card rounded-2xl py-4',
        className,
      )}
    >
      <Typography as='h5' variant='s2' className='mb-4 px-4 text-dark-text'>
        Similars
      </Typography>

      {isError ? (
        <ErrorContent onRetryClick={refetch} />
      ) : (
        <Slider>
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className={`rounded-lg ${sizeClass}`} />
            ))}

          {!isLoading && data.length === 0 && (
            <div className='w-full'>
              <NoMoviesContent />
            </div>
          )}

          {!isLoading &&
            data.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                href={`${movie.id}`}
                className={sizeClass}
                imgClassName='h-[187.5px] aspect-[2/3]'
                withDesc={false}
                imageResolution='w185'
              />
            ))}

          <div ref={ref}>
            {isFetchingNextPage && (
              <div className='flex h-full items-center'>
                <Spinner className='size-4 border-2' />
              </div>
            )}
          </div>
        </Slider>
      )}
    </section>
  );
}

export default SimilarsSection;
