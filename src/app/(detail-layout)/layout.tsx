import React, { PropsWithChildren } from 'react';

import Navbar from '@/app/components/Navbar';

function DetailLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar withBackButton />
      {children}
    </>
  );
}

export default DetailLayout;
