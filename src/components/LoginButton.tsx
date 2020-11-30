import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated} = useAuth0();  

  const [onClick, content] = isAuthenticated
    ? [() => logout({ returnTo: window.location.origin }), 'Logg ut']
    : [() => loginWithRedirect(), 'Logg inn']

  return <button className="hover:underline" tabIndex={3} onClick={onClick}>{content}</button>
};

export default LoginButton
