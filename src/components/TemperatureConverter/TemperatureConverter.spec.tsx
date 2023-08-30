import { fireEvent, render, screen } from '@testing-library/react';
import TemperatureConverter from './TemperatureConverter';

describe('Temperature component', () => {
  test('initial state values are set correctly', () => {
    render(<TemperatureConverter />);

    // Check the initial unit (Celsius) is selected
    expect(screen.getByLabelText('Celsius')).toBeChecked();
    // Check the input value is empty
    const inputElement = screen.getByTestId('input-field') as HTMLInputElement;
    expect(inputElement.value).toBe('');
    // Check that the result is not initially displayed
    expect(screen.queryByText('Converted Temperature:')).toBeNull();
  });

  test('unit changes when radio button is clicked', () => {
    render(<TemperatureConverter />);
    const fahrenheitRadioButton = screen.getByLabelText('Fahrenheit');
    expect(fahrenheitRadioButton).not.toBeChecked();

    fireEvent.click(fahrenheitRadioButton);
    expect(fahrenheitRadioButton).toBeChecked();
  });

  test('swap button toggles units', () => {
    render(<TemperatureConverter />);
    const swapButton = screen.getByText('Swap');
    const celsiusRadioButton = screen.getByLabelText('Celsius');
    const fahrenheitRadioButton = screen.getByLabelText('Fahrenheit');

    fireEvent.click(swapButton);
    expect(celsiusRadioButton).not.toBeChecked();
    expect(fahrenheitRadioButton).toBeChecked();

    fireEvent.click(swapButton);
    expect(celsiusRadioButton).toBeChecked();
    expect(fahrenheitRadioButton).not.toBeChecked();
  });

  test('correctly converts temperature', () => {
    render(<TemperatureConverter />);
    const inputElement = screen.getByTestId('input-field');
    const convertButton = screen.getByText('Convert');

    // Enter an input value in Celsius
    fireEvent.change(inputElement, { target: { value: '25' } });
    fireEvent.click(convertButton);

    // Check that the result matches the expected conversion
    expect(screen.getByText('Converted Temperature: 77.00 °F')).toBeInTheDocument();

    // Swap units and test again
    const swapButton = screen.getByText('Swap');
    fireEvent.click(swapButton);

    // Enter an input value in Fahrenheit
    fireEvent.change(inputElement, { target: { value: '77' } });
    fireEvent.click(convertButton);

    // Check that the result matches the expected conversion
    expect(screen.getByText('Converted Temperature: 25.00 °C')).toBeInTheDocument();
  });

  test('handles invalid input', () => {
    render(<TemperatureConverter />);
    const inputElement = screen.getByTestId('input-field');
    const convertButton = screen.getByText('Convert');

    // Enter an invalid input (non-numeric)
    fireEvent.change(inputElement, { target: { value: 'InvalidInput' } });
    fireEvent.click(convertButton);
    // Check that the result indicates "Invalid input"
    expect(screen.getByText('Converted Temperature: Invalid input')).toBeInTheDocument();
  });

  test('display "hot" class for a hot temperature', () => {
    render(<TemperatureConverter />);
    const inputElement = screen.getByTestId('input-field');
    const convertButton = screen.getByText('Convert');

    // Enter a temperature value that corresponds to "hot"
    fireEvent.change(inputElement, { target: { value: '40' } });
    fireEvent.click(convertButton);

    // Check that the result has the "hot" class
    expect(screen.getByText('Converted Temperature: 104.00 °F')).toHaveClass('hot');
  });

  test('display "cold" class for a cold temperature', () => {
    render(<TemperatureConverter />);
    const inputElement = screen.getByTestId('input-field');
    const convertButton = screen.getByText('Convert');

    // Enter a temperature value that corresponds to "cold"
    fireEvent.change(inputElement, { target: { value: '0' } });
    fireEvent.click(convertButton);

    // Check that the result has the "cold" class
    expect(screen.getByText('Converted Temperature: 32.00 °F')).toHaveClass('cold');
  });
});
