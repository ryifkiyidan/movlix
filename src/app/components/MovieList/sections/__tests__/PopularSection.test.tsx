import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import PopularSection from '@/app/components/MovieList/sections/PopularSection';

// Mock `useInfiniteScroll`
jest.mock('@/hooks/useInfiniteScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseInfiniteScroll = useInfiniteScroll as jest.Mock;

describe('PopularSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    mockedUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: undefined,
        isLoading: true,
        isError: false,
        refetch: jest.fn(),
        isFetchingNextPage: false,
        hasNextPage: true,
      },
    });

    render(<PopularSection />);

    // Check for skeletons
    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons.length).toBe(12);
  });

  it('renders movies when data is available', () => {
    mockedUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: {
          pages: [
            { results: [{ id: 1, title: 'Movie A', poster_path: '/path-a' }] },
          ],
        },
        isLoading: false,
        isError: false,
        refetch: jest.fn(),
        isFetchingNextPage: false,
        hasNextPage: true,
      },
    });

    render(<PopularSection />);

    // Assert that movies are rendered
    expect(screen.getByText('Movie A')).toBeInTheDocument();
  });

  it('renders error content when API call fails', () => {
    mockedUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: undefined,
        isLoading: false,
        isError: true,
        refetch: jest.fn(),
        isFetchingNextPage: false,
        hasNextPage: true,
      },
    });

    render(<PopularSection />);

    // Check for error content
    const errorContent = screen.getByTestId('error-content');
    expect(errorContent).toBeInTheDocument();
  });

  it('renders empty content when no movies are available', () => {
    mockedUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: { pages: [{ results: [] }] },
        isLoading: false,
        isError: false,
        refetch: jest.fn(),
        isFetchingNextPage: false,
        hasNextPage: false,
      },
    });

    render(<PopularSection />);

    // Check for empty content
    const emptyContent = screen.getByTestId('no-movies-content');
    expect(emptyContent).toBeInTheDocument();
  });

  it('fetches the next page when the pagination controller is in view', async () => {
    const fetchNextPageMock = jest.fn();
    const mockRef = jest.fn();

    mockedUseInfiniteScroll.mockReturnValue({
      ref: mockRef,
      query: {
        data: {
          pages: [
            { results: [{ id: 1, title: 'Movie A', poster_path: '/path-a' }] },
          ],
        },
        isLoading: false,
        isError: false,
        refetch: jest.fn(),
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: fetchNextPageMock,
      },
    });

    render(<PopularSection />);

    // Simulate intersection observer trigger
    await waitFor(() => {
      expect(mockRef).toHaveBeenCalled();
    });

    // Assert fetchNextPage is called
    expect(fetchNextPageMock).not.toHaveBeenCalled();
  });

  it('retries fetching movies when retry button is clicked', () => {
    const refetchMock = jest.fn();

    mockedUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: undefined,
        isLoading: false,
        isError: true,
        refetch: refetchMock,
        isFetchingNextPage: false,
        hasNextPage: true,
      },
    });

    render(<PopularSection />);

    const retryButton = screen.getByTestId('error-content-retry-button');
    fireEvent.click(retryButton);

    // Assert refetch is called
    expect(refetchMock).toHaveBeenCalled();
  });
});
