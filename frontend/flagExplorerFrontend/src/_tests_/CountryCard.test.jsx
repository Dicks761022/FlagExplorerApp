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

  it('calls onClick when the country card is clicked', () => {
    const mockOnClick = vi.fn(); // Mock function
    render(<CountryCard country={mockCountry} onClick={mockOnClick} />);

    const countryCard = screen.getByRole('img', { name: 'Flag of France' }).parentElement;

    // Simulate a click event
    fireEvent.click(countryCard);

    // Verify that the onClick function is called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies the passed style prop correctly', () => {
    const testStyle = { backgroundColor: 'red' };
    render(<CountryCard country={mockCountry} onClick={() => {}} style={testStyle} />);

    const countryCard = screen.getByRole('img', { name: 'Flag of France' }).parentElement;

    // Ensure the inline style is applied
    expect(countryCard).toHaveStyle('background-color: red');
  });
});
