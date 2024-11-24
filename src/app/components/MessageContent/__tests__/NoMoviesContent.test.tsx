import { render, screen } from '@testing-library/react';
import React from 'react';

import NoMoviesContent from '@/app/components/MessageContent/NoMoviesContent';
import { NAVIGATION } from '@/constant/navigation';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

jest.mock('@/components/links/PrimaryLink', () => ({
  __esModule: true,
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} data-testid='primary-link'>
      {children}
    </a>
  ),
}));

describe('NoMoviesContent', () => {
  it('renders the title and description', () => {
    render(<NoMoviesContent />);

    const title = screen.getByText('There is no movie yet!');
    const description = screen.getByText(
      (_, node) =>
        node?.textContent ===
        'Find your movie by Type title, categories, years, etc',
    );

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-dark-text');
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-dark-textSecondary');
  });

  it('renders the image with the correct attributes', () => {
    render(<NoMoviesContent />);

    const image = screen.getByAltText('empty');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/svg/empty.svg');
    expect(image).toHaveAttribute('width', '76');
    expect(image).toHaveAttribute('height', '76');
  });

  it('renders the navigation link with the correct attributes', () => {
    render(<NoMoviesContent />);

    const link = screen.getByTestId('primary-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', NAVIGATION.explore);
    expect(link).toHaveTextContent('Find');
  });

  it('applies the provided className', () => {
    const customClassName = 'custom-class';
    render(<NoMoviesContent className={customClassName} />);

    const container = screen.getByTestId('no-movies-content');
    expect(container).toHaveClass(customClassName);
  });
});
