'use client';

import { useRouter } from 'next/navigation';

import { SplashScreen } from '@/app/components/SplashScreen';
import { NAVIGATION } from '@/constant/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <SplashScreen finishLoading={() => router.replace(NAVIGATION.movie)} />
  );
}
