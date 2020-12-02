import React from 'react'

import { useRequestsAndAuth } from '../api/requests';


const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useRequestsAndAuth();  

  const [onClick, content] = isAuthenticated
    ? [() => logout({ returnTo: window.location.origin }), 'Logg ut']
    : [() => loginWithRedirect(), 'Logg inn']

  return <button className="hover:underline" tabIndex={3} onClick={onClick}>{content}</button>
};

export default LoginButton
