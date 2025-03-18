import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CountryGrid from '../components/CountryGrid';
import '@testing-library/jest-dom/vitest';

describe('CountryGrid Component', () => {
  const mockCountries = [
    { name: 'France', flag: 'https://flagcdn.com/fr.svg' },
    { name: 'Germany', flag: 'https://flagcdn.com/de.svg' },
    { name: 'Japan', flag: 'https://flagcdn.com/jp.svg' },
  ];

  it('renders the correct number of country cards', () => {
    render(<CountryGrid countries={mockCountries} onCountryClick={() => {}} />);

    // Check if all country cards are rendered
    const countryCards = screen.getAllByRole('img');
    expect(countryCards).toHaveLength(mockCountries.length);

    // Check if each country's flag is displayed
    mockCountries.forEach((country) => {
      expect(screen.getByAltText(`Flag of ${country.name}`)).toBeInTheDocument();
    });
  });


  });

