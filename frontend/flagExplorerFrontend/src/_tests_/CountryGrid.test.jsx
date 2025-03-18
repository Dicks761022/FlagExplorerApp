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

  it('calls onCountryClick when a country is clicked', () => {
    const mockOnCountryClick = vi.fn();
    render(<CountryGrid countries={mockCountries} onCountryClick={mockOnCountryClick} />);

    // Click on the first country's card (France)
    const firstCountryCard = screen.getByAltText('Flag of France').parentElement;
    fireEvent.click(firstCountryCard);

    // Verify that onCountryClick was called with France's data
    expect(mockOnCountryClick).toHaveBeenCalledWith(mockCountries[0]);
  });

  it('applies animation delay styles correctly', () => {
    render(<CountryGrid countries={mockCountries} onCountryClick={() => {}} />);

    mockCountries.forEach((country, index) => {
      const countryCard = screen.getByAltText(`Flag of ${country.name}`).parentElement;

      // Check if the animation delay is correctly applied
      expect(countryCard).toHaveStyle(`animation-delay: ${index * 0.1}s`);
    });
  });
});
