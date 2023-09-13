import { HOME_ROUTE } from 'NavigationRouters/NavigationRouters';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectorAuthenticated } from 'redux/authReducer';

const RestrictedRoute = ({ children, restrictedTo = HOME_ROUTE }) => {
  const authenticated = useSelector(selectorAuthenticated);
  return authenticated ? <Navigate to={restrictedTo} replace /> : children;
};

export default RestrictedRoute;
