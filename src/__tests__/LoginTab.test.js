import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
// @ts-ignore
import LoginTab from '../LoginTab';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';

jest.mock("@react-native-async-storage/async-storage");
jest.mock("expo-crypto");

describe('LoginTab', () => {
    it('renders correctly', () => {
        const {getByPlaceholderText} = render(<LoginTab onItemSelected={jest.fn()} />);

        expect(getByPlaceholderText('Username')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
    });

    it('calls onItemSelected with 5 when register button is pressed', () => {
        const onItemSelected = jest.fn();
        const {getByText} = render(<LoginTab onItemSelected={onItemSelected} />);

        const button = getByText('Register');
        fireEvent.press(button);

        expect(onItemSelected).toHaveBeenCalledWith(5);
    });

    it('calls onItemSelected with 1 when login is successful', async () => {
        const onItemSelected = jest.fn();

        // Mock successful login response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true, userId: "1", authToken: "token", currentGroceryListId: "1" }),
            })
        );

        // Mock password hashing
        Crypto.digestStringAsync.mockResolvedValue('hashedPassword');

        // Render component
        const {getByText, getByPlaceholderText} = render(<LoginTab onItemSelected={onItemSelected} />);

        // Simulate user input
        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent.changeText(usernameInput, 'testUsername');
        fireEvent.changeText(passwordInput, 'testPassword');

        // Simulate login button press
        const loginButton = getByText('Login');
        await act(async () => {
            fireEvent.press(loginButton);
        });

        // Verify that AsyncStorage.setItem was called with the expected values
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('userId', '1');
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('authToken', 'token');
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('currentGroceryListId', '1');

        // Verify that onItemSelected was called with 1
        expect(onItemSelected).toHaveBeenCalledWith(1);
    });
});

