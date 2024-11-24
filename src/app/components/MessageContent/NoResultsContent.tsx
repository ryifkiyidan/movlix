import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

type NoResultsContentProps = React.ComponentPropsWithoutRef<'div'>;

function NoResultsContent({ className, ...rest }: NoResultsContentProps) {
  return (
    <div
      data-testid='no-results-content'
      className={clsxm('flex flex-col items-center justify-center', className)}
      {...rest}
    >
      <Image
        src='/svg/no-results.svg'
        alt='no-results'
        width={76}
        height={76}
        className='w-[125px] aspect-square -ml-4'
      />
      <Typography
        variant='h3'
        className='text-dark-text text-center w-1/2 mt-4 mb-2'
      >
        We are sorry, we can not find the movie :(
      </Typography>
      <Typography
        variant='b3'
        className='text-dark-textSecondary text-center w-1/2'
      >
        Find your movie by Type title, categories, years, etc
      </Typography>
    </div>
  );
}

export default NoResultsContent;
