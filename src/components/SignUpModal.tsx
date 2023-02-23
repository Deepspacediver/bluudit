import React, { useRef, useState } from "react";
import { checkIfEmailUnused } from "../firebase/auth";

const SignUpModal = () => {
  const [email, setEmail] = useState("");
  const emailInputRef = useRef<null | HTMLInputElement>(null);
  const userEmail = useRef<null | string>(null);
  const validateEmail = async (email: string) => {
    console.log(email);
    if (!email) return;
    const emailResponse = await checkIfEmailUnused(email);
    // show error
    if (!emailResponse) return;
    userEmail.current = emailResponse;
  };

  // const emailSignUp =

  return (
    <div>
      <button>&times;</button>
      <h3>Sign Up</h3>
      <p>
        By continuing, you agree are setting up a Bluudit account and agree to
        our User Agreement and Privacy Policy.
      </p>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email-register-input"></label>
        <input
          type="email"
          id="email-register-input"
          name="email-register-input"
          ref={emailInputRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={emailInputRef.current?.checkValidity()}
          onClick={(e) => {
            if (
              emailInputRef.current &&
              emailInputRef.current.checkValidity()
            ) {
              validateEmail(emailInputRef.current.value);
            }
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SignUpModal;
