import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MovieList from '@/app/components/MovieList';

jest.mock('@/app/components/MovieList/sections/TrendingSection', () => () => (
  <div data-testid='trending-section'>Trending Section</div>
));
jest.mock('@/app/components/MovieList/sections/NowPlayingSection', () => () => (
  <div data-testid='now-playing-section'>Now Playing Section</div>
));
jest.mock('@/app/components/MovieList/sections/PopularSection', () => () => (
  <div data-testid='popular-section'>Popular Section</div>
));
jest.mock('@/app/components/MovieList/sections/TopRatedSection', () => () => (
  <div data-testid='top-rated-section'>Top Rated Section</div>
));
jest.mock('@/app/components/MovieList/sections/UpcomingSection', () => () => (
  <div data-testid='upcoming-section'>Upcoming Section</div>
));

jest.mock('lucide-react', () => ({
  ChevronUp: () => <div data-testid='chevron-icon'>Chevron Icon</div>,
}));

describe('MovieList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all sections correctly', () => {
    render(<MovieList />);

    // Check Trending Section
    expect(screen.getByTestId('trending-section')).toBeInTheDocument();

    // Check Tab Navigator Sections (initial tab should load Now Playing)
    expect(screen.getByTestId('now-playing-section')).toBeInTheDocument();
    expect(screen.queryByTestId('popular-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('top-rated-section')).not.toBeInTheDocument();
    expect(screen.queryByTestId('upcoming-section')).not.toBeInTheDocument();
  });

  it('switches tabs correctly', () => {
    render(<MovieList />);

    // Switch to "Popular" tab
    const popularTab = screen.getByText('Popular');
    fireEvent.click(popularTab);

    expect(screen.getByTestId('popular-section')).toBeInTheDocument();
    expect(screen.queryByTestId('now-playing-section')).not.toBeInTheDocument();

    // Switch to "Top Rated" tab
    const topRatedTab = screen.getByText('Top Rated');
    fireEvent.click(topRatedTab);

    expect(screen.getByTestId('top-rated-section')).toBeInTheDocument();
    expect(screen.queryByTestId('popular-section')).not.toBeInTheDocument();

    // Switch to "Upcoming" tab
    const upcomingTab = screen.getByText('Upcoming');
    fireEvent.click(upcomingTab);

    expect(screen.getByTestId('upcoming-section')).toBeInTheDocument();
    expect(screen.queryByTestId('top-rated-section')).not.toBeInTheDocument();
  });

  it('scrolls to the top when the scroll-to-top button is clicked', () => {
    // Mock `scrollTo` behavior
    window.scrollTo = jest.fn();

    render(<MovieList />);

    const scrollToTopButton = screen.getByTestId('chevron-icon').parentElement;
    if (scrollToTopButton) {
      fireEvent.click(scrollToTopButton);

      // Ensure scrollTo is called with the correct arguments
      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      throw new Error('Scroll-to-top button is missing a parent element');
    }
  });
});
