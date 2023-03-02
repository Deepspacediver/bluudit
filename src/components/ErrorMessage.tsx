import React from "react";

type ErrorMessageProps = { message: string };

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <span data-testid="error-span" className="error-message">
      {message}
    </span>
  );
};

export default ErrorMessage;
