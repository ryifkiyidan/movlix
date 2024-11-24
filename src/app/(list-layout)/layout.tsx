import React, { PropsWithChildren } from 'react';

import Navbar from '@/app/components/Navbar';

function ListLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default ListLayout;
