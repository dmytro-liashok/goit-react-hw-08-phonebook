import { LOGIN_ROUTE } from 'NavigationRouters/NavigationRouters';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectorAuthenticated } from 'redux/authReducer';

const PrivatesRoute = ({ children, redirectTo = LOGIN_ROUTE }) => {
  const authenticated = useSelector(selectorAuthenticated);
  return authenticated ? children : <Navigate to={redirectTo} />;
};

export default PrivatesRoute;
