import { render, screen, fireEvent } from '@testing-library/react';
import FilterFlags from './FilterFlags';

describe('FilterFlags Component', () => {
  test('renders dropdown with region options', () => {
    render(<FilterFlags onSelect={() => {}} />);

    // Check if the default value is rendered correctly
    expect(screen.getByText('Filter by region')).toBeInTheDocument();

    // Check if region options are rendered
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('North America')).toBeInTheDocument();
    expect(screen.getByText('South America')).toBeInTheDocument();
  });

  test('calls onSelect when a region is selected', () => {
    const mockOnSelect = jest.fn();
    render(<FilterFlags onSelect={mockOnSelect} />);

    // Select a region (e.g., Africa)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Africa' } });

    // Verify that the onSelect function is called with the selected region
    expect(mockOnSelect).toHaveBeenCalledWith('Africa');
  });

  test('calls onSelect with "all" when "Filter by region" is selected', () => {
    const mockOnSelect = jest.fn();
    render(<FilterFlags onSelect={mockOnSelect} />);

    // Select the "Filter by region" option (default option)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'all' } });

    // Verify that the onSelect function is called with 'all'
    expect(mockOnSelect).toHaveBeenCalledWith('all');
  });
});
