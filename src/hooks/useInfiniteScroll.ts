import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import api from '@/lib/axios';

import { PaginatedApiResponse } from '@/types/api';

async function fetchMovies<T>({
  url,
  pageParam = 1,
  searchQuery,
}: {
  url: string;
  pageParam?: number;
  searchQuery?: string;
}): Promise<PaginatedApiResponse<T>> {
  let params: Record<string, string | number | null | undefined> = {
    page: pageParam,
  };
  if (searchQuery) {
    params = { ...params, query: searchQuery };
  }
  const response = await api.get<PaginatedApiResponse<T>>(url, {
    params,
  });
  return response.data;
}

type Params = {
  url: string;
  queryKey: QueryKey;
  initialPageParam?: number;
  staleTime?: number;
  enabled?: boolean;
  searchQuery?: string;
};

function useInfiniteScroll<T>({
  queryKey,
  url,
  initialPageParam = 1,
  staleTime = 5 * 60 * 1000,
  enabled,
  searchQuery,
}: Params) {
  const query = useInfiniteQuery({
    queryKey: searchQuery?.length ? [...queryKey, searchQuery] : queryKey,
    queryFn: ({ pageParam }) => fetchMovies<T>({ url, pageParam, searchQuery }),
    initialPageParam,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime,
    enabled,
  });

  const isDataLoading =
    query.isLoading ||
    query.isFetchingNextPage ||
    query.fetchStatus === 'fetching';

  const { ref, inView } = useInView({
    threshold: 1,
    skip: isDataLoading || !query.hasNextPage,
  });

  React.useEffect(() => {
    if (query.isError) return;
    if (inView && query.hasNextPage) {
      query.fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, query.fetchNextPage, query.hasNextPage, query.isError]);

  return { ref, query };
}

export default useInfiniteScroll;
