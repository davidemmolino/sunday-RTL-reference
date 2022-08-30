import { render, screen } from '@testing-library/react';
import Options from '../Options';

//displays image from each scoop from server
test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops"/>);
    //get multiple images, and alt text assumption that names will end with 'scoop'
    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    //check that it returns the right amount of images
    expect(scoopImages).toHaveLength(2);

    // confirm atl text of images
    const altText = scoopImages.map(image => image.alt);
    //array and objects need to use toEqual matcher and primitives can use toBe
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});
