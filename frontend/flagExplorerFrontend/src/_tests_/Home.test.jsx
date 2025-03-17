import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

// Mock the fetch function to simulate the API call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { name: 'Canada', flag: 'https://flag.url', region: 'Americas' },
      { name: 'Germany', flag: 'https://flag.url', region: 'Europe' },
    ]),
  })
);

describe('Home Component', () => {
  test('renders countries and applies search and region filters', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Wait for countries to be fetched and displayed
    await waitFor(() => screen.getByText(/Canada/i));

    // Check that countries are rendered
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();
    expect(screen.getByText(/Germany/i)).toBeInTheDocument();

    // Test search functionality
    fireEvent.change(screen.getByPlaceholderText('Search countries...'), {
      target: { value: 'Canada' },
    });

    // Wait for the filtered countries
    await waitFor(() => expect(screen.queryByText(/Germany/i)).not.toBeInTheDocument());
    expect(screen.getByText(/Canada/i)).toBeInTheDocument();

    // Test region filter functionality
    fireEvent.change(screen.getByTestId('region-filter'), {
      target: { value: 'Europe' },
    });

    await waitFor(() => expect(screen.queryByText(/Canada/i)).not.toBeInTheDocument());
    expect(screen.getByText(/Germany/i)).toBeInTheDocument();
  });

  test('navigates to country details page on country click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    // Wait for the countries to be rendered
    await waitFor(() => screen.getByText(/Canada/i));

    // Simulate a click on the Canada country card
    fireEvent.click(screen.getByText(/Canada/i));

    // Check if navigation happens correctly to the country details page
    expect(window.location.pathname).toBe('/country/Canada');
  });
});
