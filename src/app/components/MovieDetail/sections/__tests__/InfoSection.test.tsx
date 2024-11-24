import { render, screen } from '@testing-library/react';
import React from 'react';

import InfoSection from '@/app/components/MovieDetail/sections/InfoSection';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

describe('InfoSection', () => {
  const mockProps = {
    poster_path: '/mock-poster.jpg',
    title: 'Mock Movie Title',
    tagline: 'Mock Tagline',
    release_date: '2024-01-01',
    runtime: 120,
    status: 'Released',
    className: 'custom-class',
  };

  it('renders the poster image with the correct attributes', () => {
    render(<InfoSection {...mockProps} />);

    const image = screen.getByAltText(mockProps.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', `/w500${mockProps.poster_path}`);
  });

  it('renders the title and tagline', () => {
    render(<InfoSection {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.tagline)).toBeInTheDocument();
  });

  it('renders the release date formatted correctly', () => {
    render(<InfoSection {...mockProps} />);

    const formattedDate = '01 January 2024'; // Expected format based on dayjs
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it('renders the runtime in minutes', () => {
    render(<InfoSection {...mockProps} />);

    expect(
      screen.getByText(`${mockProps.runtime} Minutes`),
    ).toBeInTheDocument();
  });

  it('renders the status', () => {
    render(<InfoSection {...mockProps} />);

    expect(screen.getByText(mockProps.status)).toBeInTheDocument();
  });

  it('renders a default alt attribute if no title is provided', () => {
    const propsWithoutTitle = { ...mockProps, title: undefined };
    // @ts-expect-error title is required only for test
    render(<InfoSection {...propsWithoutTitle} />);

    const image = screen.getByAltText('poster');
    expect(image).toBeInTheDocument();
  });
});
