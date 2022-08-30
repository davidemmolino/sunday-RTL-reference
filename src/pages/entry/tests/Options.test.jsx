import { render, screen } from '@testing-library/react';
import Options from '../Options';

//displays image from each scoop from server
test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops"/>);
    //get multiple images, and alt text assumption that names will end with 'scoop'
    //async req must use find by, await, and findBy
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    //check that it returns the right amount of images
    expect(scoopImages).toHaveLength(2);

    // confirm atl text of images
    const altText = scoopImages.map(image => image.alt);
    //array and objects need to use toEqual matcher and primitives can use toBe
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('testing toppings', async () => {
    render(<Options optionType='toppings' />);

    const toppingImages = await screen.findAllByRole('img', { name: /topping$/i });
    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map(topping => topping.alt);
    expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot Fudge topping']);
});