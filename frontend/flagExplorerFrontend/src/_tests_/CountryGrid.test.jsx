import { render, screen, fireEvent } from '@testing-library/react';
import CountryGrid from './CountryGrid';

describe('CountryGrid Component', () => {
  const mockCountries = [
    { name: 'Canada', flag: 'https://flag.url', region: 'Americas' },
    { name: 'Germany', flag: 'https://flag.url', region: 'Europe' },
  ];

  const mockOnCountryClick = jest.fn();

  test('renders a list of countries', () => {
    render(
      <CountryGrid countries={mockCountries} onCountryClick={mockOnCountryClick} />
    );

    // Check if country names are rendered
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    expect(screen.getByText(/Germany/i)).toBeInTheDocument();
  });

  test('calls onCountryClick when a country is clicked', () => {
    render(
      <CountryGrid countries={mockCountries} onCountryClick={mockOnCountryClick} />
    );

    // Simulate a click on the Canada country card
    fireEvent.click(screen.getByText(/Canada/i));

    // Verify that the onCountryClick function is called with the correct country
    expect(mockOnCountryClick).toHaveBeenCalledWith(mockCountries[0]);
    expect(mockOnCountryClick).toHaveBeenCalledTimes(1);
  });
});
