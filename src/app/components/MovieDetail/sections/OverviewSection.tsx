import React from 'react';

import clsxm from '@/lib/clsxm';

import ArrowLink from '@/components/links/ArrowLink';
import Typography from '@/components/typography/Typography';

type OverviewSectionProps = {
  overview: string;
  homepage: string;
  className?: string;
};

function OverviewSection({
  overview,
  homepage,
  className,
}: OverviewSectionProps) {
  return (
    <section className={clsxm('bg-dark-card p-4 rounded-2xl', className)}>
      <Typography variant='b2' className='text-dark-text mb-4 italic'>
        {overview}
      </Typography>
      {homepage && <ArrowLink href={homepage}>{homepage}</ArrowLink>}
    </section>
  );
}

export default OverviewSection;
