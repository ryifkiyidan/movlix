import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SkeletonProps = React.ComponentPropsWithoutRef<'div'>;

/**
 * Skeleton Component
 *
 * A simple placeholder component that mimics loading state.
 * It uses shimmer animation to indicate content loading.
 */
export default function Skeleton({ className, ...rest }: SkeletonProps) {
  return (
    <div
      data-testid='loading-skeleton'
      className={clsxm(
        'animate-shimmer rounded-sm bg-dark-card bg-gradient-to-r from-dark-card via-dark to-dark-card bg-[length:700px_100%] bg-no-repeat',
        className,
      )}
      {...rest}
    />
  );
}
