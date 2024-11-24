import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import CreditsSection from '@/app/components/MovieDetail/sections/CreditsSection';

jest.mock(
  '@/app/components/MovieDetail/sections/CreditsSection/TabContentCast',
  () => ({
    __esModule: true,
    default: ({ id }: { id: number }) => (
      <div data-testid='tab-content-cast'>{`Cast Content for ID ${id}`}</div>
    ),
  }),
);

jest.mock(
  '@/app/components/MovieDetail/sections/CreditsSection/TabContentCrew',
  () => ({
    __esModule: true,
    default: ({ id }: { id: number }) => (
      <div data-testid='tab-content-crew'>{`Crew Content for ID ${id}`}</div>
    ),
  }),
);

describe('CreditsSection', () => {
  const mockId = 123;

  it('renders the tab navigator with Cast and Crew tabs', () => {
    render(<CreditsSection id={mockId} />);

    // Check that both tabs are rendered
    expect(screen.getByText('Cast')).toBeInTheDocument();
    expect(screen.getByText('Crew')).toBeInTheDocument();

    // Ensure the initial tab content is "Cast"
    expect(screen.getByTestId('tab-content-cast')).toBeInTheDocument();
    expect(screen.queryByTestId('tab-content-crew')).not.toBeInTheDocument();
  });

  it('switches to the Crew tab when clicked', () => {
    render(<CreditsSection id={mockId} />);

    // Click on the Crew tab
    const crewTab = screen.getByText('Crew');
    fireEvent.click(crewTab);

    // Check that Crew content is displayed and Cast content is not
    expect(screen.getByTestId('tab-content-crew')).toBeInTheDocument();
    expect(screen.queryByTestId('tab-content-cast')).not.toBeInTheDocument();
  });
});
