import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import List from './List'; // Update the path according to your file structure
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios', () => ({
    get: (url) => {
        if (url.includes('repos')) {
            return Promise.resolve({
                data: [{ id: 1 }, { id: 2 }, { id: 3 }],
            });
        }
        return Promise.resolve({
            data: { login: 'testuser', public_repos: 3, created_at: '2023-07-28T12:00:00Z', bio: 'Test bio' },
        });
    },
}));

// 1 тест
test('renders loading message when isLoading is true', () => {
    render(<List users={[]} isLoading={true} errorMessage="" />);
    const loadingElement = screen.getByText(/Загрузка/i);
    expect(loadingElement).toBeInTheDocument();
});

// 2 тест
test('renders error message when errorMessage is provided', () => {
    render(<List users={[]} isLoading={false} errorMessage="Error message" />);
    const errorElement = screen.getByText(/Ошибка соединения/i);
    expect(errorElement).toBeInTheDocument();
});
// 3 тест
test('renders the correct number of cards on initial render', () => {
    const users = [
        { id: 1, login: 'user1' },
        { id: 2, login: 'user2' },
        { id: 3, login: 'user3' },
    ];
    render(<List users={users} isLoading={false} errorMessage="" />);
    const cardElements = screen.getAllByTestId('card');
    expect(cardElements).toHaveLength(users.length);
});