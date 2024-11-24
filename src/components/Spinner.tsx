import React from 'react';

import clsxm from '@/lib/clsxm';

function Spinner({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={clsxm(
        'w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin',
        className,
      )}
      {...props}
    />
  );
}

export default Spinner;
