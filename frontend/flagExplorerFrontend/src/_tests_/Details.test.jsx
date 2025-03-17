import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CountryGrid from '../components/CountryGrid';  // Path to CountryGrid component
import CountryDetails from '../components/CountryDetails';  // Path to CountryDetails component

describe('CountryCard Integration Test', () => {
  test('should navigate to CountryDetails on click', async () => {
    const mockCountries = [
      { name: 'Australia', population: 25000000, capital: 'Canberra', flag: 'australia_flag_url' },
      { name: 'Brazil', population: 210000000, capital: 'Brasília', flag: 'brazil_flag_url' },
    ];

    const handleCountryClick = jest.fn();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<CountryGrid countries={mockCountries} onCountryClick={handleCountryClick} />} />
          <Route
            path="/country/:name"
            element={<CountryDetails country={mockCountries[0]} />}
          />
        </Routes>
      </MemoryRouter>
    );

    // Simulate clicking on the first country card
    fireEvent.click(screen.getByText('Australia'));

    // Check if CountryDetails displays the correct information
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('Population: 25,000,000')).toBeInTheDocument();
    expect(screen.getByText('Capital: Canberra')).toBeInTheDocument();
  });
});
