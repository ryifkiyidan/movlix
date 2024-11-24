'use client';

import { ChevronUp } from 'lucide-react';
import React from 'react';

import IconButton from '@/components/buttons/IconButton';
import TabNavigator from '@/components/TabNavigator';

import NowPlayingSection from '@/app/components/MovieList/sections/NowPlayingSection';
import PopularSection from '@/app/components/MovieList/sections/PopularSection';
import TopRatedSection from '@/app/components/MovieList/sections/TopRatedSection';
import TrendingSection from '@/app/components/MovieList/sections/TrendingSection';
import UpcomingSection from '@/app/components/MovieList/sections/UpcomingSection';

function MovieList() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='w-full flex flex-col gap-6'>
      <TrendingSection />

      <TabNavigator
        tabs={['Now Playing', 'Popular', 'Top Rated', 'Upcoming']}
        contents={[
          <NowPlayingSection key='now_playing' />,
          <PopularSection key='popular' />,
          <TopRatedSection key='top_rated' />,
          <UpcomingSection key='upcoming' />,
        ]}
        tabListClassName='sticky top-16 bg-dark'
      />

      <IconButton
        icon={ChevronUp}
        size='lg'
        variant='primary'
        iconClassName='size-6'
        className='sticky bottom-4 self-end flex items-center justify-center rounded-full'
        onClick={scrollToTop}
      />
    </div>
  );
}

export default MovieList;
