import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

test('should render correctly', () => {
	const check = render(<Checkbox/>);

	expect(check.firstChild).toMatchSnapshot();
});

test('should handle onClick', () => {
	const mockFunction = jest.fn();
	const check = render(<Checkbox onClick={mockFunction} />);
	const input = check.firstChild;

	fireEvent.click(input);

	expect(mockFunction).toBeCalled();
});