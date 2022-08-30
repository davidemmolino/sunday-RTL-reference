import { render, screen } from '@testing-library/react';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';

test('handles error for scoops and toppings routes', async () => {
    server.resetHandlers(
        //force an error from the server by having it return 500
        rest.get('http://localhost:3030/scoops', (req, res, ctx) => res(ctx.json(500))),
        rest.get('http://localhost:3030/toppings', (req, res, ctx) => res(ctx.json(500)))
    );
    render(<OrderEntry />);
    
    const alerts = await screen.findAllByRole('alert', { name: 'An unexpected error has occurred. Please try again.' });
    expect(alerts).toHaveLength(2);
});
