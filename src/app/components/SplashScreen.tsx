'use client';

import anime, { AnimeInstance } from 'animejs';
import React, { useCallback, useEffect, useState } from 'react';

import { Movlix } from '@/config/Svg';

const SplashScreen = ({
  finishLoading = () => {},
}: {
  finishLoading?: (anim?: AnimeInstance) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const animate = useCallback(async () => {
    // Step 1: Outline animation
    await anime({
      targets: '#splash-logo path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutQuad',
      duration: 1000,
      begin: function (anim) {
        anim.animatables.forEach((a) => {
          a.target.setAttribute('stroke', '#fff');
          a.target.setAttribute('fill', 'none');
        });
      },
      direction: 'normal',
    }).finished;

    // Step 2 Fill color and stroke removal, and simultaneous zoom-in
    await anime
      .timeline()
      .add({
        targets: '#splash-logo path',
        strokeOpacity: [1, 0],
        fill: ['transparent', '#E50914'],
        easing: 'easeInOutQuad',
        duration: 1000,
      })
      .add(
        {
          targets: '#splash-logo',
          scale: [1, 2],
          easing: 'easeInOutQuad',
          duration: 1000,
        },
        '-=1000',
      ).finished;

    // Step 3: Fade out the background
    await anime({
      targets: '#splash-bg',
      opacity: 0,
      duration: 500,
      delay: 200,
      easing: 'easeInOutQuad',
      loop: false,
    }).finished;

    // Notify the parent that loading is complete
    finishLoading();
  }, [finishLoading]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
      animate();
    }, 1);
    return () => clearTimeout(timeout);
  }, [animate]);

  return (
    <div
      id='splash-bg'
      className='fixed z-50 flex items-center justify-center w-screen h-screen bg-[linear-gradient(342deg,_var(--tw-gradient-stops))] from-[#242A32_7.29%] via-[#333A40_40.63%] to-[#242A32]'
      aria-busy={!isMounted}
    >
      <Movlix
        id='splash-logo'
        className='fill-transparent w-1/3 md:w-[200px]' // Initially invisible
      />
    </div>
  );
};

export { SplashScreen };
