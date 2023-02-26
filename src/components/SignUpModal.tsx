import React, { useState } from "react";
import { checkIfEmailUnused, createNewUser } from "../firebase/auth";
import isEmailValid from "../utils/isEmailValid";

const SignUpModal = () => {
  const [email, setEmail] = useState("");
  const [isEmailAccepted, setIsEmailAccepted] = useState(false);
  const handleEmailCheck = async (email: string) => {
    if (!email || !isEmailValid(email)) return;
    const emailResponse = await checkIfEmailUnused(email);
    // todo: implement show error/success
    if (emailResponse) {
      if (emailResponse === "used") {
        console.log("Email is in use");
        return;
      } else {
        console.log("email available");
        setIsEmailAccepted(true)
        return;
      }
    }
  };

  return (
    <div>
      <button>&times;</button>
      <h3>Sign Up</h3>
      <p>
        By continuing, you agree are setting up a Bluudit account and agree to
        our User Agreement and Privacy Policy.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="email-register-input">Email</label>
        <input
          type="email"
          id="email-register-input"
          name="email-register-input"
          placeholder="Email"
          pattern={`[a-z0-9]+@[a-z]+.[a-z]{2,3}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={!isEmailValid(email)}
          onClick={(e) => {
            handleEmailCheck(email);
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SignUpModal;
