'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';

import api from '@/lib/axios';

import DetailContent from '@/app/components/MovieDetail/DetailContent';
import CreditsSection from '@/app/components/MovieDetail/sections/CreditsSection';
import SimilarsSection from '@/app/components/MovieDetail/sections/SimilarsSection';

import type { MovieDetail } from '@/types/movie';

const fetchMovieDetail = async (id: string): Promise<MovieDetail> => {
  const response = await api.get<MovieDetail>(`/movie/${id}`);
  return response.data;
};

export default function MovieDetail({ id }: { id: string }) {
  const {
    data: movie,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetail(id as string),
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
      <div className='col-span-1 flex flex-col gap-4'>
        <DetailContent
          movie={movie}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          refetch={refetch}
        />
      </div>

      <div className='col-span-1 grid grid-cols-1 gap-4 max-h-[calc(100vh-64px)]'>
        <SimilarsSection id={Number(id)} className='col-span-1' />
        <CreditsSection id={Number(id)} className='col-span-1' />
      </div>
    </div>
  );
}
