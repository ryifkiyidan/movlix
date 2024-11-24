import { useQuery } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TrendingSection from '@/app/components/MovieList/sections/TrendingSection';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const mockedUseQuery = useQuery as jest.Mock;

describe('TrendingSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    render(<TrendingSection />);

    // Check for skeletons
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons.length).toBe(12);
  });

  it('renders movies when data is available', async () => {
    mockedUseQuery.mockReturnValue({
      data: {
        results: [
          { id: 1, title: 'Movie A', poster_path: '/path-to-image' },
          { id: 2, title: 'Movie B', poster_path: '/path-to-image' },
        ],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<TrendingSection />);

    expect(screen.getByText('Movie A')).toBeInTheDocument();
    expect(screen.getByText('Movie B')).toBeInTheDocument();
  });

  it('renders error content when API call fails', async () => {
    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
    });

    render(<TrendingSection />);

    const errorContent = screen.getByTestId('error-content');
    expect(errorContent).toBeInTheDocument();
  });

  it('renders empty content when no movies are available', async () => {
    mockedUseQuery.mockReturnValue({
      data: {
        results: [],
      },
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<TrendingSection />);

    const emptyContent = screen.getByTestId('no-movies-content');
    expect(emptyContent).toBeInTheDocument();
  });

  it('retries fetching movies when retry button is clicked', async () => {
    const refetchMock = jest.fn();

    mockedUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: refetchMock,
    });

    render(<TrendingSection />);

    const retryButton = screen.getByTestId('error-content-retry-button');
    fireEvent.click(retryButton);

    expect(refetchMock).toHaveBeenCalled();
  });
});
