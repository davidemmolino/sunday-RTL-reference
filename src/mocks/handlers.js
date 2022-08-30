import { rest } from 'msw';

export const handlers = [
    //mocking a get request
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {}),
];