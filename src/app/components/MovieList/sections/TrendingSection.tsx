'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import api from '@/lib/axios';

import MovieCard from '@/components/cards/MovieCard';
import Skeleton from '@/components/Skeleton';
import Slider from '@/components/Slider';
import Typography from '@/components/typography/Typography';

import ErrorContent from '@/app/components/MessageContent/ErrorContent';
import NoMoviesContent from '@/app/components/MessageContent/NoMoviesContent';

import { MovieList } from '@/types/movie';

interface ApiResponse {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieList[];
}

const fetchMovies = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>('/movie/trending');
  return response.data;
};

function TrendingSection() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['trending'],
    queryFn: fetchMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const movies = data?.results ?? [];
  const sizeClass = 'w-[250px] h-[375px]';

  return (
    <section className='w-full'>
      <Typography as='h1' variant='h1' className='mb-4 px-4 text-white'>
        Top Picks This Week
      </Typography>

      {isError ? (
        <ErrorContent onRetryClick={refetch} />
      ) : (
        <Slider>
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className={`rounded-lg ${sizeClass}`} />
            ))}

          {!isLoading && !movies?.length && (
            <div className='w-full'>
              <NoMoviesContent />
            </div>
          )}

          {!isLoading &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                href={`movie/${movie.id}`}
                className={sizeClass}
                imgClassName='h-[375px] aspect-[2/3]'
              />
            ))}
        </Slider>
      )}
    </section>
  );
}

export default TrendingSection;
