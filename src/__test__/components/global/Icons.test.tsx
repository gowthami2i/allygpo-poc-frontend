import React from 'react';
import { render } from '@testing-library/react';
import Icons from '../../../components/global/appIcons/Icon';

describe('Icons', () => {
  it('should render the correct icon based on the provided name', () => {
  const { getByTestId } = render(<Icons name="check" />);
    const iconElement = getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('icon-check');
  });

  it('should render a default icon if no name is provided', () => {
    const { getByTestId } = render(<Icons iconName={''} />);
    const iconElement = getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('icon-default');
  });

  // Add more test cases here based on your requirements

});