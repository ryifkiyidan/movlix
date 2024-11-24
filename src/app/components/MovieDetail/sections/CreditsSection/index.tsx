'use client';

import React from 'react';

import clsxm from '@/lib/clsxm';

import TabNavigator from '@/components/TabNavigator';

import TabContentCast from './TabContentCast';
import TabContentCrew from './TabContentCrew';

type CreditsSectionProps = {
  id: number | undefined;
  className?: string;
};

const CreditsSection = ({ id, className }: CreditsSectionProps) => {
  const tabs = ['Cast', 'Crew'];
  const content = [
    <TabContentCast key='cast' id={id} />,
    <TabContentCrew key='crew' id={id} />,
  ];

  return (
    <TabNavigator
      tabs={tabs}
      contents={content}
      className={clsxm(
        'bg-dark-card rounded-2xl px-4 pb-4 overflow-y-auto no-scrollbar',
        className,
      )}
      tabListClassName='sticky top-0 bg-dark-card z-10'
    />
  );
};

export default CreditsSection;
