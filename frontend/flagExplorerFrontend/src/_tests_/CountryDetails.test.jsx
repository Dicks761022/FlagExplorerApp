import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CountryDetails from '../components/CountryDetails';
import '@testing-library/jest-dom/vitest';

describe('CountryDetails Component', () => {
  const mockCountry = {
    name: 'Canada',
    population: 37742154,
    capital: 'Ottawa',
    flag: 'https://flagcdn.com/ca.svg',
  };

  it('renders without errors when no country is provided', () => {
    render(<CountryDetails country={null} />);
    expect(screen.queryByText('Country Details')).not.toBeInTheDocument();
  });

  it('renders country details correctly', () => {
    render(<CountryDetails country={mockCountry} />);

    // Check if heading is displayed
    expect(screen.getByText('Country Details')).toBeInTheDocument();

    // Verify country name
    expect(screen.getByText(mockCountry.name)).toBeInTheDocument();

  
   
  });


});
