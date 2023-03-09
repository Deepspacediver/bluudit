import React, { ChangeEvent, useState } from "react";
import { checkIfEmailUnused, createNewUser } from "../firebase/authSetup";
import { checkUsernameAvailable } from "../firebase/firestoreSetup";
import debounce from "lodash.debounce";
import isEmailValid from "../utils/isEmailValid";
import ErrorMessage from "./ErrorMessage";

const SignUpModal = () => {
  const [email, setEmail] = useState("");
  const [isEmailAccepted, setIsEmailAccepted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [isUsernameAccepted, setIsUsernameAccepted] = useState(false);

  const handleEmailCheck = async (email: string) => {
    if (!email || !isEmailValid(email)) return;
    const emailResponse = await checkIfEmailUnused(email);
    // todo: implement show error/success
    if (emailResponse) {
      if (emailResponse === "used") {
        setEmailError("Email already in use");
        console.log("Email is in use");
        return;
      } else {
        console.log("email available");
        setEmailError("");
        setIsEmailAccepted(true);
        return;
      }
    }
  };

  const isRegisterReady = (password: string, username: string) =>
    password.length >= 6 && username;

  const handleUsernameChange = debounce(async (e: ChangeEvent) => {
    try {
      const input = e.target as HTMLInputElement;
      if (!input.value) {
        setUsername("");
        return;
      }
      const usernameResponse = await checkUsernameAvailable(input.value);
      console.log({ usernameResponse });
      if (usernameResponse) {
        setUsername(usernameResponse);
      } else setUsername("");
    } catch (error) {
      console.error(error);
    }
  }, 500);

  const emailPhase = (
    <div className="email-container" data-testid="email-container">
      <label htmlFor="email-register-input">Email</label>
      <input
        key={1}
        type="email"
        id="email-register-input"
        name="email-register-input"
        placeholder="Email"
        pattern={`[a-z0-9]+@[a-z]+.[a-z]{2,3}`}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <ErrorMessage message={emailError} />
    </div>
  );

  const usernameAndPwdPhase = (
    <div data-testid="username-password-container">
      <label htmlFor="username-input">Username</label>
      <input
        type="text"
        id="username-input"
        name="username-input"
        key={2}
        onChange={(e) => handleUsernameChange(e)}
      />
      <label htmlFor="password-input">Password</label>
      <input
        type="password"
        name="password-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password-input"
        key={3}
      />
    </div>
  );

  return (
    <div>
      <button>&times;</button>
      <h3>Sign Up</h3>
      <p>
        By continuing, you agree are setting up a Bluudit account and agree to
        our User Agreement and Privacy Policy.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        {!isEmailAccepted ? emailPhase : usernameAndPwdPhase}
        <button
          disabled={
            !isEmailAccepted
              ? !isEmailValid(email)
              : !isRegisterReady(password, username)
          }
          onClick={(e) => {
            handleEmailCheck(email);
          }}
        >
          {!isEmailAccepted ? "Continue" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpModal;
