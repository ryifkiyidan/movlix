import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import MovieExplore from '@/app/components/MovieExplore';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
  useSearchParams: jest.fn(() => ({
    get: jest.fn(() => null),
  })),
}));

jest.mock('usehooks-ts', () => ({
  __esModule: true,
  useDebounceValue: jest.fn((value) => [value]),
}));

jest.mock('@/hooks/useInfiniteScroll', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    ref: jest.fn(),
    query: {
      data: {
        pages: [],
      },
      isError: false,
      isLoading: false,
      isFetchingNextPage: false,
      isFetched: false,
      refetch: jest.fn(),
    },
  })),
}));

jest.mock('@/app/components/MovieList/List', () => ({
  __esModule: true,
  default: () => <div data-testid='list'>List Component</div>,
}));

jest.mock('@/app/components/MovieList/PaginationController', () => ({
  __esModule: true,
  default: () => (
    <div data-testid='pagination-controller'>Pagination Controller</div>
  ),
}));

describe('MovieExplore', () => {
  const mockReplace = jest.fn();
  const mockUseRouter = jest.requireMock('next/navigation').useRouter;
  const mockUseSearchParams =
    jest.requireMock('next/navigation').useSearchParams;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      replace: mockReplace,
    });
    mockUseSearchParams.mockReturnValue({
      get: jest.fn(() => null),
    });
  });

  it('renders the search input and related components', () => {
    render(<MovieExplore />);

    expect(
      screen.getByPlaceholderText('Search something...'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-controller')).toBeInTheDocument();
  });

  it('updates the search value and query string on input change', async () => {
    render(<MovieExplore />);

    const searchInput = screen.getByPlaceholderText('Search something...');
    fireEvent.change(searchInput, { target: { value: 'Batman' } });

    expect(searchInput).toHaveValue('Batman');

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('?search=Batman');
    });
  });

  it('does not make a search request when input is empty', async () => {
    render(<MovieExplore />);

    const searchInput = screen.getByPlaceholderText('Search something...');
    fireEvent.change(searchInput, { target: { value: '' } });

    await waitFor(() => {
      expect(mockReplace).not.toHaveBeenCalledWith(
        expect.stringContaining('search='),
      );
    });
  });
});
