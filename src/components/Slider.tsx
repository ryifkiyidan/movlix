import React from 'react';

import clsxm from '@/lib/clsxm';

type SliderProps = React.ComponentPropsWithoutRef<'div'>;

function Slider({ className, children, ...props }: SliderProps) {
  return (
    <div
      className={clsxm(
        'flex w-full snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 no-scrollbar',
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<{ className?: string }>(child)) {
          const dataLength = React.Children.count(children);

          const childClassName =
            index === 0
              ? 'snap-start'
              : index === dataLength - 1
                ? 'snap-end'
                : 'snap-center';

          return (
            <div
              className={clsxm(
                child.props.className,
                childClassName,
                'flex flex-shrink-0',
              )}
            >
              {child}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}

export default Slider;
