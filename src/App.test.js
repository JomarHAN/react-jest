import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const appId = screen.getByTestId('app')
  expect(appId).toBeInTheDocument();
});

