import { render, screen } from '@testing-library/react';
import React from 'react';

import SimilarsSection from '@/app/components/MovieDetail/sections/SimilarsSection';

jest.mock('@/hooks/useInfiniteScroll', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/components/cards/MovieCard', () => ({
  __esModule: true,
  default: ({ movie }: { movie: { id: number } }) => (
    <div data-testid='movie-card'>{`Movie ${movie.id}`}</div>
  ),
}));

jest.mock('@/app/components/MessageContent/ErrorContent', () => ({
  __esModule: true,
  default: ({ onRetryClick }: { onRetryClick: () => void }) => (
    <div data-testid='error-content' onClick={onRetryClick}>
      Error Content
    </div>
  ),
}));

jest.mock('@/app/components/MessageContent/NoMoviesContent', () => ({
  __esModule: true,
  default: () => <div data-testid='no-movies-content'>No Movies</div>,
}));

jest.mock('@/components/Slider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='slider'>{children}</div>
  ),
}));

jest.mock('@/components/Skeleton', () => ({
  __esModule: true,
  default: ({ className }: { className: string }) => (
    <div data-testid='skeleton' className={className}>
      Loading Skeleton
    </div>
  ),
}));

jest.mock('@/components/Spinner', () => ({
  __esModule: true,
  default: ({ className }: { className: string }) => (
    <div data-testid='spinner' className={className}>
      Spinner
    </div>
  ),
}));

describe('SimilarsSection', () => {
  const mockUseInfiniteScroll = jest.requireMock(
    '@/hooks/useInfiniteScroll',
  ).default;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading skeletons when loading', () => {
    mockUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: undefined,
        isLoading: true,
        isError: false,
        isFetchingNextPage: false,
        refetch: jest.fn(),
      },
    });

    render(<SimilarsSection id={1} />);

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons.length).toBe(12);
  });

  it('renders error content when there is an error', () => {
    const mockRefetch = jest.fn();
    mockUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: undefined,
        isLoading: false,
        isError: true,
        isFetchingNextPage: false,
        refetch: mockRefetch,
      },
    });

    render(<SimilarsSection id={1} />);

    const errorContent = screen.getByTestId('error-content');
    expect(errorContent).toBeInTheDocument();

    // Simulate retry button click
    errorContent.click();
    expect(mockRefetch).toHaveBeenCalled();
  });

  it('renders no movies content when data is empty', () => {
    mockUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: {
          pages: [],
        },
        isLoading: false,
        isError: false,
        isFetchingNextPage: false,
        refetch: jest.fn(),
      },
    });

    render(<SimilarsSection id={1} />);

    expect(screen.getByTestId('no-movies-content')).toBeInTheDocument();
  });

  it('renders movie cards when data is available', () => {
    mockUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: {
          pages: [{ results: [{ id: 1 }, { id: 2 }] }],
        },
        isLoading: false,
        isError: false,
        isFetchingNextPage: false,
        refetch: jest.fn(),
      },
    });

    render(<SimilarsSection id={1} />);

    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards.length).toBe(2);
    expect(movieCards[0]).toHaveTextContent('Movie 1');
    expect(movieCards[1]).toHaveTextContent('Movie 2');
  });

  it('renders a spinner when fetching next page', () => {
    mockUseInfiniteScroll.mockReturnValue({
      ref: jest.fn(),
      query: {
        data: {
          pages: [{ results: [{ id: 1 }] }],
        },
        isLoading: false,
        isError: false,
        isFetchingNextPage: true,
        refetch: jest.fn(),
      },
    });

    render(<SimilarsSection id={1} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
