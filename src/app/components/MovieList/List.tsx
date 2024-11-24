import React from 'react';

import clsxm from '@/lib/clsxm';

import MovieCard from '@/components/cards/MovieCard';
import Skeleton from '@/components/Skeleton';

import ErrorContent from '@/app/components/MessageContent/ErrorContent';
import NoMoviesContent from '@/app/components/MessageContent/NoMoviesContent';
import NoResultsContent from '@/app/components/MessageContent/NoResultsContent';
import { NAVIGATION } from '@/constant/navigation';

import { MovieList } from '@/types/movie';

type ListProps = {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  isNotFound?: boolean;
  data: MovieList[] | undefined;
  onRetryClick?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

function List({
  isLoading,
  isError,
  isEmpty,
  isNotFound,
  data = [],
  className,
  onRetryClick,
  ...rest
}: ListProps) {
  if (!isLoading && isError) {
    return <ErrorContent onRetryClick={onRetryClick} />;
  }

  if (!isLoading && isNotFound) {
    return <NoResultsContent className='mt-4' />;
  }

  if (!isLoading && isEmpty) {
    return <NoMoviesContent className='mt-4' />;
  }

  return (
    <div
      className={clsxm(
        'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-4',
        className,
      )}
      {...rest}
    >
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <Skeleton
              key={index}
              className='rounded-lg col-span-1 w-full h-auto aspect-[1/1.71]'
            />
          ))
        : data?.map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              href={`${NAVIGATION.movie}/${movie.id}`}
            />
          ))}
    </div>
  );
}

export default List;
