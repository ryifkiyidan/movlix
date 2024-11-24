import React from 'react';

import clsxm from '@/lib/clsxm';

import Avatar from '@/components/avatar/Avatar';
import Typography from '@/components/typography/Typography';

type CreditCardProps = {
  className?: string;
  imagePath: string;
  name: string;
  desc: string;
};

function CreditCard({ className, imagePath, name, desc }: CreditCardProps) {
  return (
    <div
      className={clsxm('flex flex-col items-center justify-start', className)}
    >
      <Avatar src={imagePath} name={name} size={128} />

      <Typography className='text-white text-center mt-2'>{name}</Typography>
      <Typography className='text-dark-textSecondary text-center'>
        {desc}
      </Typography>
    </div>
  );
}

export default CreditCard;
