import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App'; // Path to App component
import { MemoryRouter } from 'react-router-dom';

describe('App Component Integration Test', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { name: 'Australia', population: 25000000, capital: 'Canberra', flag: 'australia_flag_url' },
          { name: 'Brazil', population: 210000000, capital: 'Brasília', flag: 'brazil_flag_url' },
        ]),
      })
    );
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should display countries and navigate to country details on click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Wait for countries to load
    await waitFor(() => screen.getByText('Australia'));

    // Simulate clicking on a country card
    fireEvent.click(screen.getByText('Australia'));

    // Check if CountryDetails page is displayed
    expect(screen.getByText('Australia')).toBeInTheDocument();
    expect(screen.getByText('Population: 25,000,000')).toBeInTheDocument();
    expect(screen.getByText('Capital: Canberra')).toBeInTheDocument();
  });
});
