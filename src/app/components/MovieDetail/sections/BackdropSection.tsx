import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

import { NEXT_PUBLIC_TMDB_IMAGE_URL } from '@/constant/env';

import { MovieDetail } from '@/types/movie';

type BackdropSectionProps = Pick<
  MovieDetail,
  'backdrop_path' | 'title' | 'genres' | 'vote_average'
> &
  React.ComponentPropsWithoutRef<'div'>;

function BackdropSection({
  className,
  backdrop_path,
  title,
  genres,
  vote_average,
}: BackdropSectionProps) {
  return (
    <div
      className={clsxm(
        'relative w-full h-auto rounded-2xl overflow-hidden -z-10',
        className,
      )}
    >
      <Image
        src={`${NEXT_PUBLIC_TMDB_IMAGE_URL}/original${backdrop_path}`}
        alt={title || 'backdrop'}
        width={1080}
        height={608}
        className='w-full h-auto object-cover bg-center'
        priority
      />
      <div className='w-full absolute bottom-0 p-4 sm:p-6 md:p-4 flex items-end justify-between z-10'>
        <div className='flex flex-col gap-2'>
          {genres
            .slice(0, 3)
            .sort((a, b) => a.name.length - b.name.length)
            .map((i) => (
              <Typography
                key={i.id}
                as='div'
                variant='h6'
                className='text-white rounded-xl bg-dark-card py-2 px-4 flex items-center gap-1 truncate w-fit'
              >
                {i.name}
              </Typography>
            ))}
        </div>
        <Typography
          as='div'
          variant='h6'
          className='text-rating rounded-xl bg-dark-card py-2 px-4 flex items-center gap-1'
        >
          <StarIcon size='1em' /> {vote_average.toFixed(1)}
        </Typography>
      </div>

      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 pointer-events-none' />
    </div>
  );
}

export default BackdropSection;
