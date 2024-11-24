import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

type EmptyContentProps = {
  title: string;
  description: string;
} & React.ComponentPropsWithoutRef<'div'>;

function EmptyContent({
  className,
  title,
  description,
  ...rest
}: EmptyContentProps) {
  return (
    <div
      data-testid='empty-content'
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
        {title}
      </Typography>
      <Typography
        variant='b3'
        className='text-dark-textSecondary text-center w-1/2'
      >
        {description}
      </Typography>
    </div>
  );
}

export default EmptyContent;
