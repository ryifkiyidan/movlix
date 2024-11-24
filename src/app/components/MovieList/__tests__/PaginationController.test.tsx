import { render, screen } from '@testing-library/react';
import React from 'react';

import PaginationController from '@/app/components/MovieList/PaginationController';

jest.mock('@/components/Spinner', () => ({
  __esModule: true,
  default: ({ className }: { className: string }) => (
    <div data-testid='spinner' className={className}>
      Spinner
    </div>
  ),
}));

describe('PaginationController', () => {
  it('renders without the spinner when isFetchingNextPage is false', () => {
    render(<PaginationController isFetchingNextPage={false} />);

    // Spinner should not be present
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('renders the spinner when isFetchingNextPage is true', () => {
    render(<PaginationController isFetchingNextPage={true} />);

    // Spinner should be present
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('applies the provided className to the container', () => {
    const customClassName = 'custom-class';
    render(
      <PaginationController
        isFetchingNextPage={false}
        className={customClassName}
        data-testid='pagination-container'
      />,
    );

    // Ensure the container has the custom className
    const container = screen.getByTestId('pagination-container');
    expect(container).toHaveClass(customClassName);
  });

  it('forwards other props to the container', () => {
    render(
      <PaginationController
        isFetchingNextPage={false}
        data-testid='pagination-container'
      />,
    );

    // Ensure the container has the forwarded prop
    expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
  });

  it('forwards the ref to the container', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<PaginationController isFetchingNextPage={false} ref={ref} />);

    // Ensure the ref is assigned to the container
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
