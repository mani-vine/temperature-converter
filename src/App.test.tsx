import { render, screen } from '@testing-library/react';
import App from './App';

test('renders temperature converter', () => {
  render(<App />);
  const linkElement = screen.getByText(/Temperature Converter/i);
  expect(linkElement).toBeInTheDocument();
});
