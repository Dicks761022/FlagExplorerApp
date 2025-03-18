import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CountryCard from '../components/CountryCard';
import '@testing-library/jest-dom/vitest';

describe('CountryCard Component', () => {
  const mockCountry = {
    name: 'France',
    flag: 'https://flagcdn.com/fr.svg',
  };

  it('renders the country card with flag image', () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);

    // Check if the flag image is rendered correctly
    const flagImage = screen.getByAltText('Flag of France');
    expect(flagImage).toBeInTheDocument();
    expect(flagImage).toHaveAttribute('src', mockCountry.flag);
  });



});
