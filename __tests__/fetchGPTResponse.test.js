import axios from 'axios';
import { fetchChatGPTResponse } from '../src/utils/fetchGPTResponse';


jest.mock('firebase/app', () => ({
    // Mock the Firebase modules and functions used in this test file
    messaging: () => ({
        // Mock specific messaging functions as needed
        onMessage: jest.fn(),
        getToken: jest.fn(),
    }),
    // Mock other Firebase services as needed
}));
jest.mock('axios');


describe('fetchChatGPTResponse', () => {
    it('fetches successfully data from an API', async () => {
        const userInput = "Hello, world!";
        const expectedResponse = "Mocked response";

        axios.post.mockImplementationOnce(() => Promise.resolve({ data: { choices: [{ text: expectedResponse }] } }));

        await expect(fetchChatGPTResponse(userInput)).resolves.toEqual(expectedResponse);
    });

    it('fetches erroneously data from an API', async () => {
        const errorMessage = 'Network Error';

        axios.post.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

        await expect(fetchChatGPTResponse("")).rejects.toThrow(errorMessage);
    });
});