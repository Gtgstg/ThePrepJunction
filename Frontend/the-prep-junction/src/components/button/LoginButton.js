import React from 'react';

const LoginButton = ({ className }) => {
    return (
      <a className={className} href="/auth/google">Login with Google</a>
    );
  };

export default LoginButton;