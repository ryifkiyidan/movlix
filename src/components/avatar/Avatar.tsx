import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';
import { getInitials } from '@/lib/format';

import Typography from '@/components/typography/Typography';

export type AvatarProps = {
  src?: string | null;
  size?: number;
  className?: string;
  name: string;
};

function Avatar({ src, size = 50, className = '', name }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={clsxm(
        'rounded-full overflow-hidden flex items-center justify-center bg-light',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          data-testid='avatar-image'
          src={src}
          alt={initials}
          width={128}
          height={75}
          className='aspect-square object-cover'
          style={{ width: size, height: size }}
        />
      ) : (
        <Typography
          data-testid='avatar-initials'
          as='span'
          variant='h1'
          className='text-dark-textTertiary'
          style={{ fontSize: size / 3 }}
        >
          {initials}
        </Typography>
      )}
    </div>
  );
}

export default Avatar;
