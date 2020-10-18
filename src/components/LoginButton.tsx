import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated} = useAuth0();
  
  if(isAuthenticated){
    return <button onClick={() => logout({ returnTo: window.location.origin })}>LOGG UT</button>
  }
  return <button onClick={() => loginWithRedirect()}>LOGG INN</button>

  
};

export default LoginButton