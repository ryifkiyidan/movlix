import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import PrimaryLink from '@/components/links/PrimaryLink';
import Typography from '@/components/typography/Typography';

import { NAVIGATION } from '@/constant/navigation';

type NoMoviesContentProps = React.ComponentPropsWithoutRef<'div'>;

function NoMoviesContent({ className, ...rest }: NoMoviesContentProps) {
  return (
    <div
      data-testid='no-movies-content'
      className={clsxm('flex flex-col items-center justify-center', className)}
      {...rest}
    >
      <Image
        src='/svg/empty.svg'
        alt='empty'
        width={76}
        height={76}
        className='w-[150px] aspect-square -ml-4'
      />
      <Typography
        variant='h3'
        className='text-dark-text text-center w-1/2 mt-4 mb-2'
      >
        There is no movie yet!
      </Typography>
      <Typography
        variant='b3'
        className='text-dark-textSecondary text-center w-1/2'
      >
        <PrimaryLink
          href={NAVIGATION.explore}
          className='text-inherit'
          size='sm'
        >
          Find
        </PrimaryLink>{' '}
        your movie by Type title, categories, years, etc
      </Typography>
    </div>
  );
}

export default NoMoviesContent;
