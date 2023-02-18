import LoginForm from "../components/LoginModal";
import { expect, describe, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

describe("LoginModal tests", () => {
  it("renders container with input label pair", () => {
    render(<LoginForm />);
    const container = screen.getByTestId("input-container");
    expect(container).toBeInTheDocument();
    expect(within(container).getByRole("textbox")).toBeInTheDocument()
    expect(within(container).getByLabelText(/Nickname/)).toBeInTheDocument()
  });
});
