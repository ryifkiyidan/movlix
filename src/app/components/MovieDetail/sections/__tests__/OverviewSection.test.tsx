import { render, screen } from '@testing-library/react';
import React from 'react';

import OverviewSection from '@/app/components/MovieDetail/sections/OverviewSection';

jest.mock('@/components/links/ArrowLink', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-testid='arrow-link'>
      {children}
    </a>
  ),
}));

describe('OverviewSection', () => {
  const mockProps = {
    overview: 'This is a mock overview of the movie.',
    homepage: 'https://example.com',
    className: 'custom-class',
  };

  it('renders the overview text', () => {
    render(<OverviewSection {...mockProps} />);

    const overviewText = screen.getByText(mockProps.overview);
    expect(overviewText).toBeInTheDocument();
    expect(overviewText).toHaveClass('text-dark-text');
  });

  it('renders the homepage link when provided', () => {
    render(<OverviewSection {...mockProps} />);

    const homepageLink = screen.getByTestId('arrow-link');
    expect(homepageLink).toBeInTheDocument();
    expect(homepageLink).toHaveAttribute('href', mockProps.homepage);
    expect(homepageLink).toHaveTextContent(mockProps.homepage);
  });

  it('does not render the homepage link when not provided', () => {
    render(<OverviewSection {...mockProps} homepage='' />);

    const homepageLink = screen.queryByTestId('arrow-link');
    expect(homepageLink).not.toBeInTheDocument();
  });
});
