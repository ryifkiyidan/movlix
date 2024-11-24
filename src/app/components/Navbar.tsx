'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import clsxm from '@/lib/clsxm';

import IconButton from '@/components/buttons/IconButton';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';

import { Movlix } from '@/config/Svg';
import { NAVIGATION } from '@/constant/navigation';

type NavbarProps = { withBackButton?: boolean } & React.ComponentProps<'nav'>;

function Navbar({ withBackButton, className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navs = [
    {
      title: 'Home',
      href: NAVIGATION.movie,
    },
    {
      title: 'Explore',
      href: NAVIGATION.explore,
    },
    // {
    //   title: 'About',
    //   href: NAVIGATION.about,
    // },
  ];

  return (
    <nav
      data-state={isOpen ? 'open' : 'closed'}
      className={clsxm(
        'text-dark-text sticky top-0 w-full z-50 rounded-b-2xl transition-all duration-200',
        'data-[state=open]:bg-dark-card data-[state=open]:shadow-lg',
        'sm:data-[state=open]:bg-dark sm:data-[state=open]:shadow-none',
        'data-[state=closed]:bg-dark data-[state=closed]:shadow-none',
        className,
      )}
    >
      <div className='layout'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center gap-2'>
            {/* Back Button */}
            {withBackButton && (
              <IconButton
                onClick={router.back}
                icon={ChevronLeft}
                iconClassName='size-6'
                variant='ghost'
                size='base'
                className='flex items-center rounded-full'
              />
            )}
            {/* Logo */}
            <UnstyledLink href={NAVIGATION.movie}>
              <Movlix width={80} height={32} className='fill-primary-500' />
            </UnstyledLink>
          </div>

          {/* Menu toggle for mobile */}
          <div className='sm:hidden'>
            <button
              type='button'
              className='text-gray-400 hover:text-dark-text focus:outline-none focus:text-dark-text'
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d={
                    isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className='hidden sm:flex sm:items-center sm:space-x-4'>
            {navs.map((nav) => (
              <UnderlineLink key={nav.title} href={nav.href}>
                {nav.title}
              </UnderlineLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className='sm:hidden data-[state=closed]:hidden'
      >
        <div className='layout px-1 pb-4 space-y-2 flex flex-col'>
          {navs.map((nav) => (
            <div key={nav.title}>
              <UnderlineLink href={nav.href}>{nav.title}</UnderlineLink>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
