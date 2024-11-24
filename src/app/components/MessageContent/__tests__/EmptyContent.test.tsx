import { render, screen } from '@testing-library/react';
import React from 'react';

import EmptyContent from '@/app/components/MessageContent/EmptyContent';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

describe('EmptyContent', () => {
  const mockProps = {
    title: 'No Data Available',
    description:
      'There is currently no data to display. Please try again later.',
  };

  it('renders the title and description', () => {
    render(<EmptyContent {...mockProps} />);

    const title = screen.getByText(mockProps.title);
    const description = screen.getByText(mockProps.description);

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-dark-text');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-dark-textSecondary');
  });

  it('renders the image with the correct attributes', () => {
    render(<EmptyContent {...mockProps} />);

    const image = screen.getByAltText('empty');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/svg/empty.svg');
    expect(image).toHaveAttribute('width', '76');
    expect(image).toHaveAttribute('height', '76');
  });

  it('applies the provided className', () => {
    const customClassName = 'custom-class';
    render(<EmptyContent {...mockProps} className={customClassName} />);

    const container = screen.getByTestId('empty-content');
    expect(container).toHaveClass(customClassName);
  });
});
