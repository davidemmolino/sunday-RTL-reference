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

  // do we even want to test things like dropdowns?
  //   test("Dropdown", () => {
  //     render(<SummaryForm />);
  //     const dropdown = screen.getByRole("select");
  //     expect(dropdown).toBeInTheDocument();
  //   });
});
