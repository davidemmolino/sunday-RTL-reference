import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from '@testing-library/user-event';

describe("Testing summary form component", () => {
  test("Initial conditions", () => {
    render(<SummaryForm />);
    
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(checkbox).not.toBeChecked();

    const confirmButton = screen.getByRole("button");
    expect(confirmButton).toBeDisabled();
  });

  test("Checkbox enables button on first click and disables on second click", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    await user.click(checkbox);
    expect(confirmButton).toBeEnabled();

    await user.click(checkbox);
    expect(confirmButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    const user = userEvent.setup();
    render(<SummaryForm />);

    //popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    
    //popover appears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(
      /terms and conditions/i
    );
    await user.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    //popover disappears when we mouseout
    await user.unhover(popover);
    const nullPopoverAgain = screen.queryByText(      
      /no ice cream will actually be delivered/i
    );
    expect(nullPopoverAgain).not.toBeInTheDocument();
  })

  // do we even want to test things like dropdowns?
  //   test("Dropdown", () => {
  //     render(<SummaryForm />);
  //     const dropdown = screen.getByRole("select");
  //     expect(dropdown).toBeInTheDocument();
  //   });
});
