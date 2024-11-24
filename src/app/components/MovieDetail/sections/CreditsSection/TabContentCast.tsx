import { useQuery } from '@tanstack/react-query';
import React from 'react';

import api from '@/lib/axios';

import Skeleton from '@/components/Skeleton';

import EmptyContent from '@/app/components/MessageContent/EmptyContent';
import ErrorContent from '@/app/components/MessageContent/ErrorContent';
import { NEXT_PUBLIC_TMDB_IMAGE_URL } from '@/constant/env';

import CreditCard from './CreditCard';

import { MovieCredits } from '@/types/movie';

const fetchMovieCredits = async (id: string): Promise<MovieCredits> => {
  const response = await api.get<MovieCredits>(`/movie/${id}/credits`);
  return response.data;
};

function TabContentCast({ id }: { id: number | undefined }) {
  const {
    data: credits,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [id, 'credits'],
    queryFn: () => fetchMovieCredits(id!.toString()),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const gridClassName =
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8';

  if (isError) {
    return (
      <div className='p-4'>
        <ErrorContent onRetryClick={refetch} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={gridClassName}>
        {Array.from({ length: 12 }, (_, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center'
          >
            <Skeleton className='rounded-full w-[125px] aspect-square' />
            <Skeleton className='rounded-lg w-24 h-4 mt-2' />
            <Skeleton className='rounded-lg w-16 h-4 mt-1' />
          </div>
        ))}
      </div>
    );
  }

  if (!credits?.cast.length) {
    return (
      <EmptyContent
        title='No Cast Information Available'
        description='Cast details for this movie are currently unavailable. Please try again later.'
      />
    );
  }

  return (
    <div className={gridClassName}>
      {credits.cast.map((member) => (
        <CreditCard
          key={`${member.id}-${member.name}-${member.character}`}
          className='col-span-1'
          imagePath={
            member.profile_path
              ? `${NEXT_PUBLIC_TMDB_IMAGE_URL}/w154${member.profile_path}`
              : ''
          }
          name={member.name}
          desc={member.character}
        />
      ))}
    </div>
  );
}

export default TabContentCast;
