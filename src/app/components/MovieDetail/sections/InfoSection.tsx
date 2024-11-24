import dayjs from 'dayjs';
import { Calendar, Clock, Ticket } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

import { NEXT_PUBLIC_TMDB_IMAGE_URL } from '@/constant/env';

import { MovieDetail } from '@/types/movie';

type InfoSectionProps = Pick<
  MovieDetail,
  'poster_path' | 'title' | 'tagline' | 'release_date' | 'runtime' | 'status'
> &
  React.ComponentPropsWithoutRef<'div'>;

function InfoSection({
  className,
  poster_path,
  title,
  tagline,
  release_date,
  runtime,
  status,
}: InfoSectionProps) {
  return (
    <div className={clsxm('flex flex-col gap-6', className)}>
      <div className='flex gap-4'>
        <Image
          src={`${NEXT_PUBLIC_TMDB_IMAGE_URL}/w500${poster_path}`}
          alt={title ?? 'poster'}
          width={500}
          height={750}
          className='w-1/3 md:w-1/5 aspect-[500/750] object-cover rounded-2xl shadow-lg'
        />

        <div className='flex flex-col gap-4 justify-between'>
          <div>
            <Typography as='h1' variant='h1' className='text-white'>
              {title}
            </Typography>
            <Typography
              as='h1'
              variant='s1'
              className='text-dark-textSecondary'
            >
              {tagline}
            </Typography>
          </div>

          <div className='flex flex-col gap-2'>
            <Typography
              as='p'
              variant='b2'
              className='text-dark-textSecondary flex items-center gap-2'
            >
              <Calendar size='1em' />
              {dayjs(release_date).format('DD MMMM YYYY')}
            </Typography>
            <Typography
              as='p'
              variant='b2'
              className='text-dark-textSecondary flex items-center gap-2'
            >
              <Clock size='1em' />
              {runtime} Minutes
            </Typography>
            <Typography
              as='p'
              variant='b2'
              className='text-dark-textSecondary flex items-center gap-2'
            >
              <Ticket size='1em' />
              {status}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
