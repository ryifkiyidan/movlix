import * as React from 'react';

import clsxm from '@/lib/clsxm';

import Spinner from '@/components/Spinner';

type PaginationControllerProps = {
  isFetchingNextPage: boolean;
} & React.ComponentPropsWithRef<'div'>;

const PaginationController = React.forwardRef<
  HTMLDivElement,
  PaginationControllerProps
>(({ className, isFetchingNextPage, ...rest }, ref) => {
  return (
    <div ref={ref} className={clsxm('w-full', className)} {...rest}>
      {isFetchingNextPage && (
        <div className='flex justify-center'>
          <Spinner className='size-8 border-2' />
        </div>
      )}
    </div>
  );
});

export default PaginationController;
