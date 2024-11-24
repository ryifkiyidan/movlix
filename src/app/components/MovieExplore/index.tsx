'use client';

import { Search, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';

import Input from '@/components/forms/Input';

import List from '@/app/components/MovieList/List';
import PaginationController from '@/app/components/MovieList/PaginationController';

import { MovieList } from '@/types/movie';

function MovieExplore() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      search: '',
    },
  });

  const { reset, setValue, watch } = methods;
  const searchValue = watch('search');
  const [debounceSearchValue] = useDebounceValue(searchValue, 500);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const searchQueryParam = searchParams.get('search');
    if (searchQueryParam && searchQueryParam !== searchValue) {
      setValue('search', searchQueryParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, setValue]);

  useEffect(() => {
    const searchQueryParam = searchParams.get('search');
    if (debounceSearchValue && debounceSearchValue !== searchQueryParam) {
      router.replace(`?search=${debounceSearchValue}`);
    }
    if (!debounceSearchValue && searchQueryParam) {
      router.replace('?');
    }
  }, [debounceSearchValue, router, searchParams]);

  const { ref, query: moviesQuery } = useInfiniteScroll<MovieList>({
    queryKey: ['search'],
    url: '/movie/search',
    searchQuery: debounceSearchValue,
    enabled: !!debounceSearchValue,
  });

  const data = moviesQuery.data?.pages.flatMap((page) => page.results);

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <FormProvider {...methods}>
        <div className='sticky top-16'>
          <Input
            id='search'
            label={null}
            placeholder='Search something...'
            leftIcon={Search}
            leftIconClassName='text-dark-textTertiary'
            rightNode={
              <button
                type='button'
                className='p-1'
                onClick={() => {
                  reset();
                  setValue('search', '');
                }}
              >
                <XCircle size={18} className='text-dark-textTertiary' />
              </button>
            }
            onChange={(e) => setValue('search', e.target.value)}
          />
        </div>
      </FormProvider>

      <List
        isError={moviesQuery.isError}
        isLoading={moviesQuery.isLoading}
        isEmpty={!moviesQuery.isFetched && !data?.length}
        isNotFound={moviesQuery.isFetched && !data?.length}
        onRetryClick={moviesQuery.refetch}
        data={data}
      />

      <PaginationController
        ref={ref}
        isFetchingNextPage={moviesQuery.isFetchingNextPage}
      />
    </div>
  );
}

export default MovieExplore;
