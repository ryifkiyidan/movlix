import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Typography from '@/components/typography/Typography';

type TabNavigatorProps = {
  tabs: string[];
  contents: React.JSX.Element[];
  className?: string;
  tabListClassName?: string;
  tabPanelsClassName?: string;
};

function TabNavigator({
  tabs,
  contents,
  className,
  tabListClassName,
  tabPanelsClassName,
}: TabNavigatorProps) {
  return (
    <TabGroup as='section' className={className}>
      <TabList className={clsxm('flex gap-x-1', tabListClassName)}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              clsxm(
                'w-full py-4 border-b-2 ring-0 outline-none',
                selected ? 'border-primary-500' : 'border-transparent',
              )
            }
          >
            <Typography variant='s2' className='text-dark-text'>
              {tab}
            </Typography>
          </Tab>
        ))}
      </TabList>
      <TabPanels className={clsxm('mt-2', tabPanelsClassName)}>
        {contents.map((item, index) => (
          <TabPanel key={index}>{item}</TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}

export default TabNavigator;
