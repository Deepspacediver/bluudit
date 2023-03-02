import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpModal from "../components/SignUpModal";
import { checkIfEmailUnused } from "../firebase/authSetup";

vi.mock("../firebase/authSetup", async () => {
  const actual = (await vi.importActual("../firebase/authSetup")) as object;
  return {
    ...actual,
    checkIfEmailUnused: vi.fn(),
  };
});

const mockedCheckEmail = vi.mocked(checkIfEmailUnused, true);

describe("SignUpModal initial stage testing", () => {
  it("renders input for email", () => {
    render(<SignUpModal />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders error span", () => {
    render(<SignUpModal />);
    expect(screen.getByTestId("error-span")).toBeInTheDocument();
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
    mockedCheckEmail.mockReturnValueOnce(Promise.resolve("used"));
    const error = screen.getByTestId("error-span");
    await userEvent.type(input, "test@test.com");
    await user.click(
      screen.getByRole("button", {
        name: "Continue",
      })
    );
    expect(input).toBeInTheDocument();
    expect(error).toHaveTextContent("Email already in use");
    expect(mockedCheckEmail).toHaveBeenCalled();
    expect(mockedCheckEmail).toHaveReturnedWith("used");
  });

  it("does not show error if email unused", async () => {
    const user = userEvent.setup();
    render(<SignUpModal />);
    const input = screen.getByRole("textbox");
    mockedCheckEmail.mockReturnValueOnce(Promise.resolve("original@mail.com"));
    await userEvent.type(input, "original@mail.com");
    await user.click(
      screen.getByRole("button", {
        name: "Continue",
      })
    );
    expect(mockedCheckEmail).toHaveReturnedWith("original@mail.com");
    expect(screen.queryByTestId("email-container")).not.toBeInTheDocument();
  });
});
