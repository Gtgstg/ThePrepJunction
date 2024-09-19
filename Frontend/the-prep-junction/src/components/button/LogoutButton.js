import React from 'react';

const LogoutButton = ({ className }) => {
  const handleLogout = () => {
    // Perform logout action, e.g., send a request to logout endpoint
    window.location.href = '/auth/logout';
  };

  return (
    <button className={className} onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;