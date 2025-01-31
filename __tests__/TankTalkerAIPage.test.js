import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TankTalkerAIPage from '../src/components/TankTalkerAI/TankTalkerAIPage';
import { fetchChatGPTResponse } from '../src/utils/fetchGPTResponse';
import '@testing-library/jest-dom';


jest.mock('firebase/app', () => ({
    // Mock the Firebase modules and functions used in this test file
    messaging: () => ({
        // Mock specific messaging functions as needed
        onMessage: jest.fn(),
        getToken: jest.fn(),
    }),
    // Mock other Firebase services as needed
}));


jest.mock('../../src/utils/fetchGPTResponse', () => ({
    fetchChatGPTResponse: jest.fn(),
}));

describe('TankTalkerAIPage', () => {
    it('submits input and displays response', async () => {
        fetchChatGPTResponse.mockResolvedValue('Mocked AI response');
        render(<TankTalkerAIPage />);

        fireEvent.change(screen.getByPlaceholderText(/Ask your aquarium-related questions here.../i), { target: { value: 'Test question' } });
        fireEvent.click(screen.getByText(/Ask/i));

        await screen.findByText(/Mocked AI response/i);
    });
});