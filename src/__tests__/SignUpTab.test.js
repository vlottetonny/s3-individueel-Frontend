// This test suite includes two tests:
//     Checking if the component renders correctly and that the inputs exist.
//     Testing whether the component's state updates correctly when text is entered into the inputs.

import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import SignUpTab from '../pages/SignUpTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('expo-crypto');

describe('<SignUpTab />', () => {
    it('should render correctly', () => {
        const { getByPlaceholderText } = render(<SignUpTab onItemSelected={jest.fn()} selectedIndex={0} />);

        expect(getByPlaceholderText('Username')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
        expect(getByPlaceholderText('Confirm password')).toBeTruthy();
        expect(getByPlaceholderText('First name')).toBeTruthy();
        expect(getByPlaceholderText('Last name')).toBeTruthy();
    });

    it('should handle input changes', () => {
        const { getByPlaceholderText } = render(<SignUpTab onItemSelected={jest.fn()} selectedIndex={0} />);

        fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
        fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');
        fireEvent.changeText(getByPlaceholderText('Confirm password'), 'testpassword');
        fireEvent.changeText(getByPlaceholderText('First name'), 'John');
        fireEvent.changeText(getByPlaceholderText('Last name'), 'Doe');

        expect(getByPlaceholderText('Username').props.value).toBe('testuser');
        expect(getByPlaceholderText('Password').props.value).toBe('testpassword');
        expect(getByPlaceholderText('Confirm password').props.value).toBe('testpassword');
        expect(getByPlaceholderText('First name').props.value).toBe('John');
        expect(getByPlaceholderText('Last name').props.value).toBe('Doe');
    });

});
