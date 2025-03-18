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

    // Verify population with formatted number
    expect(screen.getByText(`Population: ${mockCountry.population.toLocaleString()}`)).toBeInTheDocument();

    // Verify capital
    expect(screen.getByText(`Capital: ${mockCountry.capital}`)).toBeInTheDocument();
  });

  it('renders the flag image correctly', () => {
    render(<CountryDetails country={mockCountry} />);

    // Check if the flag image is displayed with correct attributes
    const flagImg = screen.getByAltText(mockCountry.name);
    expect(flagImg).toBeInTheDocument();
    expect(flagImg).toHaveAttribute('src', mockCountry.flag);
  });
});
