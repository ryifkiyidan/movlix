import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Typography from '@/components/typography/Typography';

type ErrorContentProps = {
  onRetryClick?: () => void;
} & React.ComponentPropsWithoutRef<'div'>;

function ErrorContent({ className, onRetryClick, ...rest }: ErrorContentProps) {
  return (
    <div
      data-testid='error-content'
      className={clsxm('flex flex-col items-center justify-center', className)}
      {...rest}
    >
      <Image
        src='/images/popcorn.png'
        alt='error'
        width={189}
        height={189}
        className='w-[150px] aspect-square -ml-4'
      />
      <Typography
        variant='h3'
        className='text-dark-text text-center w-1/2 mt-4 mb-2'
      >
        Oops something went wrong!
      </Typography>
      <Typography
        variant='b3'
        className='text-dark-textSecondary text-center w-1/2'
      >
        Please try again later
      </Typography>
      {onRetryClick && (
        <Button
          data-testid='error-content-retry-button'
          onClick={onRetryClick}
          className='mt-4'
        >
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorContent;
