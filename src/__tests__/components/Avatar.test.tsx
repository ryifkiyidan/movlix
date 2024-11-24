import { render, screen } from '@testing-library/react';
import React from 'react';

import Avatar from '@/components/avatar/Avatar';

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src='/path/to/image.jpg' name='John Doe' size={100} />);

    // Check for the image
    const image = screen.getByRole('img', { name: 'JD' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fpath%2Fto%2Fimage.jpg&w=256&q=75',
    );
    expect(image).toHaveAttribute('alt', 'JD');
  });

  it('renders initials when src is not provided', () => {
    render(<Avatar name='Jane Doe' size={33} />);

    // Check for the initials
    const initials = screen.getByText('JD');
    expect(initials).toBeInTheDocument();
    expect(initials).toHaveStyle('font-size: 11px'); // size / 3
  });

  it('handles single-word names correctly for initials', () => {
    render(<Avatar name='Jane' size={50} />);

    // Check for single-letter initials
    const initials = screen.getByText('J');
    expect(initials).toBeInTheDocument();
  });

  it('handles double-word names correctly for initials', () => {
    render(<Avatar name='Jane Doe' size={50} />);

    // Check for single-letter initials
    const initials = screen.getByText('JD');
    expect(initials).toBeInTheDocument();
  });

  it('handles triple-word names correctly for initials', () => {
    render(<Avatar name='Jane Doe William' size={50} />);

    // Check for single-letter initials
    const initials = screen.getByText('JW');
    expect(initials).toBeInTheDocument();
  });

  it('handles multiple-word names correctly for initials', () => {
    render(<Avatar name='Jane Doe William Yun' size={50} />);

    // Check for single-letter initials
    const initials = screen.getByText('JY');
    expect(initials).toBeInTheDocument();
  });

  it('applies custom className and size', () => {
    render(<Avatar name='John Doe' size={80} className='custom-class' />);

    const avatar = screen.getByText('JD').parentElement;
    expect(avatar).toHaveClass('custom-class');
    expect(avatar).toHaveStyle('width: 80px; height: 80px;');
  });
});
