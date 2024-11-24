import dayjs from 'dayjs';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';
import Typography from '@/components/typography/Typography';

import { NEXT_PUBLIC_TMDB_IMAGE_URL } from '@/constant/env';

import type { MovieList } from '@/types/movie';

type MovieCardProps = {
  movie: MovieList;
  href: string;
  imgClassName?: string;
  withDesc?: boolean;
  imageResolution?:
    | 'w92'
    | 'w154'
    | 'w185'
    | 'w342'
    | 'w500'
    | 'w780'
    | 'original';
} & React.ComponentPropsWithoutRef<'a'>;

function MovieCard({
  href,
  movie,
  className,
  imgClassName,
  children,
  withDesc = true,
  imageResolution = 'w500',
  ...rest
}: MovieCardProps) {
  return (
    <UnstyledLink
      href={href}
      className={clsxm(
        'bg-dark-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow',
        className,
      )}
      openNewTab={false}
      {...rest}
    >
      <Image
        src={`${NEXT_PUBLIC_TMDB_IMAGE_URL}/${imageResolution}${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={750}
        className={clsxm('w-full h-auto object-cover', imgClassName)}
      />
      {(withDesc || !movie) && (
        <div className='p-4'>
          <Typography as='h2' variant='h4' className='text-white truncate'>
            {movie.title}
          </Typography>
          <div className='flex flex-row justify-between items-center'>
            <Typography as='p' variant='b3' className='text-dark-textSecondary'>
              {dayjs(movie.release_date).format('YYYY')}
            </Typography>
            <Typography
              as='p'
              variant='h6'
              className='text-rating flex items-center gap-1'
            >
              <Star size='1em' /> {movie.vote_average?.toFixed(1)}
            </Typography>
          </div>
        </div>
      )}
      {children}
    </UnstyledLink>
  );
}

export default MovieCard;
