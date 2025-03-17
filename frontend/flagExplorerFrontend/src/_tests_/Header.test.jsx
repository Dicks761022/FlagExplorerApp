import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  test('renders header text and paragraph', () => {
    render(<Header setSearchFlag={() => {}} setSelectedRegion={() => {}} />);
    
    // Check if the header text is rendered
    expect(screen.getByText('Welcome to Flag Explorer')).toBeInTheDocument();
    expect(screen.getByText(/Discover the world, one flag at a time/)).toBeInTheDocument();
  });

  test('renders SearchBar and FilterFlags components', () => {
    render(<Header setSearchFlag={() => {}} setSelectedRegion={() => {}} />);
    
    // Check if the SearchBar and FilterFlags components are rendered
    expect(screen.getByPlaceholderText('Search for a country')).toBeInTheDocument();
    expect(screen.getByText('Filter by region')).toBeInTheDocument();  // Assuming the default text is "Filter by region"
  });

  test('calls setSearchFlag when typing in SearchBar', () => {
    const mockSetSearchFlag = jest.fn();
    render(<Header setSearchFlag={mockSetSearchFlag} setSelectedRegion={() => {}} />);
    
    // Simulate typing in the search input
    fireEvent.change(screen.getByPlaceholderText('Search for a country'), { target: { value: 'Germany' } });
    
    // Check if setSearchFlag was called with the correct argument
    expect(mockSetSearchFlag).toHaveBeenCalledWith('Germany');
  });

  test('calls setSelectedRegion when selecting a region', () => {
    const mockSetSelectedRegion = jest.fn();
    render(<Header setSearchFlag={() => {}} setSelectedRegion={mockSetSelectedRegion} />);
    
    // Simulate selecting a region from the dropdown
    fireEvent.change(screen.getByText('Filter by region'), { target: { value: 'Asia' } });
    
    // Check if setSelectedRegion was called with the correct value
    expect(mockSetSelectedRegion).toHaveBeenCalledWith('Asia');
  });
});
