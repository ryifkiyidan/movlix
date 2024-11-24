import { render, screen } from '@testing-library/react';
import React from 'react';

import BackdropSection from '@/app/components/MovieDetail/sections/BackdropSection';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

describe('BackdropSection', () => {
  const mockProps = {
    backdrop_path: '/mock-backdrop.jpg',
    title: 'Mock Title',
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Comedy' },
    ],
    vote_average: 8.5,
    className: 'custom-class',
  };

  it('renders the backdrop image with correct attributes', () => {
    render(<BackdropSection {...mockProps} />);

    const image = screen.getByAltText(mockProps.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `/original${mockProps.backdrop_path}`);
  });

  it('renders genres sorted by name length and limited to 3 items', () => {
    render(<BackdropSection {...mockProps} />);

    const genreElements = screen.getAllByText(/Action|Adventure|Comedy/);
    expect(genreElements.length).toBe(3);

    // Ensure they are sorted by name length
    expect(genreElements[0]).toHaveTextContent('Action');
    expect(genreElements[1]).toHaveTextContent('Comedy');
    expect(genreElements[2]).toHaveTextContent('Adventure');
  });

  it('renders a default alt attribute if no title is provided', () => {
    const propsWithoutTitle = { ...mockProps, title: undefined };
    // @ts-expect-error title is required only for test
    render(<BackdropSection {...propsWithoutTitle} />);

    const image = screen.getByAltText('backdrop');
    expect(image).toBeInTheDocument();
  });
});
