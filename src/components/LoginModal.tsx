import React from "react";

const LoginModal = () => {
  return (
    <div className="login-modal">
      <h2>Login</h2>
      <p>
        By continuing, you agree are setting up a Reddit account and agree to
        our User Agreement and Privacy Policy.
      </p>
      <form className="login-modal__form" action=""></form>
      <div data-testid="input-container" className="input-container">
        <input
          className="input-container__textbox"
          id="nickname-input"
          type="text"
        />
        <label className="input-container__label" htmlFor="nickname-input">
          Nickname
        </label>
      </div>
    </div>
  );
};

export default LoginModal;
