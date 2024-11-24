import React from 'react';

import Skeleton from '@/components/Skeleton';

import ErrorContent from '@/app/components/MessageContent/ErrorContent';
import BackdropSection from '@/app/components/MovieDetail/sections/BackdropSection';
import InfoSection from '@/app/components/MovieDetail/sections/InfoSection';
import OverviewSection from '@/app/components/MovieDetail/sections/OverviewSection';

import type { MovieDetail } from '@/types/movie';

type DetailContentProps = {
  movie: MovieDetail | null | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
};

function DetailContent({
  movie,
  isLoading,
  isFetching,
  isError,
  refetch,
}: DetailContentProps) {
  if (isLoading || (isFetching && (!movie || isError))) {
    return <Skeleton className='w-full h-full rounded-2xl' />;
  }

  if (isError || !movie) {
    return <ErrorContent className='w-full h-full' onRetryClick={refetch} />;
  }

  return (
    <>
      <BackdropSection
        backdrop_path={movie.backdrop_path}
        genres={movie.genres}
        title={movie.title}
        vote_average={movie.vote_average}
      />

      <InfoSection
        poster_path={movie.poster_path}
        title={movie.title}
        tagline={movie.tagline}
        release_date={movie.release_date}
        runtime={movie.runtime}
        status={movie.status}
      />

      <OverviewSection overview={movie.overview} homepage={movie.homepage} />
    </>
  );
}

export default DetailContent;
