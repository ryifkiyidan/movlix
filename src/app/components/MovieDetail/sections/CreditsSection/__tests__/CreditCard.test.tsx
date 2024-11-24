import { render, screen } from '@testing-library/react';
import React from 'react';

import CreditCard from '@/app/components/MovieDetail/sections/CreditsSection/CreditCard';

describe('CreditCard', () => {
  it('renders the CreditCard component with image, name, and description', () => {
    render(
      <CreditCard
        imagePath='/path/to/image.jpg'
        name='John Doe'
        desc='Actor'
      />,
    );

    // Check avatar image
    expect(screen.getByTestId('avatar-image')).toBeInTheDocument();
    expect(screen.getByAltText('JD')).toBeInTheDocument();

    // Check name and description
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Actor')).toBeInTheDocument();
  });

  it('renders the CreditCard component with initials fallback if no image', () => {
    render(<CreditCard imagePath='' name='Jane Doe' desc='Singer' />);

    // Check avatar initials
    expect(screen.getByTestId('avatar-initials')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();

    // Check name and description
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Singer')).toBeInTheDocument();
  });
});
