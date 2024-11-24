import { render, screen } from '@testing-library/react';
import React from 'react';

import NoResultsContent from '@/app/components/MessageContent/NoResultsContent';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

describe('NoResultsContent', () => {
  it('renders the title and description', () => {
    render(<NoResultsContent />);

    const title = screen.getByText(
      'We are sorry, we can not find the movie :(',
    );
    const description = screen.getByText(
      'Find your movie by Type title, categories, years, etc',
    );

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-dark-text');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-dark-textSecondary');
  });

  it('renders the image with the correct attributes', () => {
    render(<NoResultsContent />);

    const image = screen.getByAltText('no-results');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/svg/no-results.svg');
    expect(image).toHaveAttribute('width', '76');
    expect(image).toHaveAttribute('height', '76');
  });

  it('applies the provided className', () => {
    const customClassName = 'custom-class';
    render(<NoResultsContent className={customClassName} />);

    const container = screen.getByTestId('no-results-content');
    expect(container).toHaveClass(customClassName);
  });
});
