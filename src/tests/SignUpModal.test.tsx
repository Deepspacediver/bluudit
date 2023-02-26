import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpModal from "../components/SignUpModal";
import { checkIfEmailUnused } from "../firebase/auth";

describe("SignUpModal", () => {
  it("renders input for email", () => {
    render(<SignUpModal />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("marks input as valid with proper email format", async () => {
    render(<SignUpModal />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "tester@test.com");
    expect(input).toHaveValue("tester@test.com");
    expect(input).toBeValid();
  });

  it("marks input as invalid when provided wrong email format", async () => {
    const user = userEvent.setup();
    render(<SignUpModal />);
    const input = screen.getByRole("textbox");
    await user.type(input, "not email");
    expect(input).toHaveValue("not email");
    expect(input).toBeInvalid();
  });

  it("should render button to submit email", () => {
    render(<SignUpModal />);
    expect(
      screen.getByRole("button", {
        name: "Continue",
      })
    ).toBeInTheDocument();
  });

  it("should make button disabled when invalid email", () => {
    render(<SignUpModal />);
    expect(
      screen.getByRole("button", {
        name: "Continue",
      })
    ).toBeDisabled();
  });

  it("should make button enabled when valid email", async () => {
    const user = userEvent.setup();
    render(<SignUpModal />);
    await user.type(screen.getByRole("textbox"), "tester@test.com");
    expect(
      screen.getByRole("button", {
        name: "Continue",
      })
    ).toBeEnabled();
  });

  it("email input remains if the email is already in use", async () => {
    const user = userEvent.setup();
    render(<SignUpModal />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test@test.com");
    await user.click(
      screen.getByRole("button", {
        name: "Continue",
      })
    );
    expect(input).toBeInTheDocument();
  });

  it.todo(
    "shows nickane and password form elements when email is accepted",
    async () => {
      const user = userEvent.setup();
      render(<SignUpModal />);
      const input = screen.getByRole("textbox");
      await userEvent.type(input, "original@test.com");
      await user.click(
        screen.getByRole("button", {
          name: "Continue",
        })
      );
      expect(input).not.toBeInTheDocument();
    }
  );
});
