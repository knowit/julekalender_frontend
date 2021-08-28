import useRequestsAndAuth from '../hooks/useRequestsAndAuth';
import Button from './Button';


const LoginButton = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useRequestsAndAuth();

  const [onClick, content] = isAuthenticated
    ? [() => logout({ returnTo: window.location.origin }), 'Logg ut']
    : [() => loginWithRedirect(), 'Logg inn']

  return <Button tabIndex={3} onClick={onClick}>{content}</Button>
};

export default LoginButton
