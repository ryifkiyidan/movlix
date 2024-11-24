import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import ErrorContent from '@/app/components/MessageContent/ErrorContent';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/components/buttons/Button', () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

describe('ErrorContent', () => {
  it('renders the error message and image', () => {
    render(<ErrorContent />);

    const title = screen.getByText('Oops something went wrong!');
    const description = screen.getByText('Please try again later');
    const image = screen.getByAltText('error');

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-dark-text');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-dark-textSecondary');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/popcorn.png');
  });

  it('renders the retry button when onRetryClick is provided', () => {
    const mockRetry = jest.fn();

    render(<ErrorContent onRetryClick={mockRetry} />);

    const retryButton = screen.getByTestId('error-content-retry-button');
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent('Try Again');

    // Simulate button click
    fireEvent.click(retryButton);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it('does not render the retry button when onRetryClick is not provided', () => {
    render(<ErrorContent />);

    const retryButton = screen.queryByTestId('error-content-retry-button');
    expect(retryButton).not.toBeInTheDocument();
  });

  it('applies the provided className', () => {
    const customClassName = 'custom-class';
    render(<ErrorContent className={customClassName} />);

    const container = screen.getByTestId('error-content');
    expect(container).toHaveClass(customClassName);
  });
});
