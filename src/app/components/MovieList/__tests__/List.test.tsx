import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import List from '@/app/components/MovieList/List';

jest.mock('@/app/components/MessageContent/ErrorContent', () => ({
  __esModule: true,
  default: ({ onRetryClick }: { onRetryClick: () => void }) => (
    <div data-testid='error-content'>
      Error Content
      <button data-testid='retry-button' onClick={onRetryClick}>
        Retry
      </button>
    </div>
  ),
}));

jest.mock('@/app/components/MessageContent/NoMoviesContent', () => ({
  __esModule: true,
  default: () => <div data-testid='no-movies-content'>No Movies Found</div>,
}));

jest.mock('@/app/components/MessageContent/NoResultsContent', () => ({
  __esModule: true,
  default: () => <div data-testid='no-results-content'>No Results Found</div>,
}));

jest.mock('@/components/Skeleton', () => ({
  __esModule: true,
  default: () => <div data-testid='loading-skeleton'>Loading...</div>,
}));

jest.mock('@/components/cards/MovieCard', () => ({
  __esModule: true,
  default: ({ movie }: { movie: { id: number; title: string } }) => (
    <div data-testid={`movie-card-${movie.id}`}>{movie.title}</div>
  ),
}));

describe('List Component', () => {
  it('renders loading skeletons when loading', () => {
    render(
      <List
        isLoading={true}
        isError={false}
        isEmpty={false}
        data={undefined}
      />,
    );

    const skeletons = screen.getAllByTestId('loading-skeleton');
    expect(skeletons.length).toBe(12);
  });

  it('renders error content when there is an error', () => {
    const mockRetry = jest.fn();

    render(
      <List
        isLoading={false}
        isError={true}
        isEmpty={false}
        data={undefined}
        onRetryClick={mockRetry}
      />,
    );

    expect(screen.getByTestId('error-content')).toBeInTheDocument();

    const retryButton = screen.getByTestId('retry-button');
    fireEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalled();
  });

  it('renders no results content when no results are found', () => {
    render(
      <List
        isLoading={false}
        isError={false}
        isEmpty={false}
        isNotFound={true}
        data={undefined}
      />,
    );

    expect(screen.getByTestId('no-results-content')).toBeInTheDocument();
  });

  it('renders no movies content when list is empty', () => {
    render(
      <List
        isLoading={false}
        isError={false}
        isEmpty={true}
        data={undefined}
      />,
    );

    expect(screen.getByTestId('no-movies-content')).toBeInTheDocument();
  });

  it('renders movie cards when data is available', () => {
    const mockData = [
      {
        id: 1,
        title: 'Movie A',
        poster_path: '/path-a',
        release_date: '2024-01-01',
        vote_average: 8.5,
        adult: false,
        backdrop_path: '/backdrop-a',
        genre_ids: [28, 12],
        original_language: 'en',
        original_title: 'Movie A Original',
        overview: 'Overview of Movie A',
        popularity: 100.0,
        video: false,
        vote_count: 200,
      },
      {
        id: 2,
        title: 'Movie B',
        poster_path: '/path-b',
        release_date: '2024-01-02',
        vote_average: 7.5,
        adult: false,
        backdrop_path: '/backdrop-b',
        genre_ids: [35, 18],
        original_language: 'en',
        original_title: 'Movie B Original',
        overview: 'Overview of Movie B',
        popularity: 80.0,
        video: false,
        vote_count: 150,
      },
    ];

    render(
      <List
        isLoading={false}
        isError={false}
        isEmpty={false}
        data={mockData}
      />,
    );

    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument();
    expect(screen.getByText('Movie A')).toBeInTheDocument();
    expect(screen.getByText('Movie B')).toBeInTheDocument();
  });
});
