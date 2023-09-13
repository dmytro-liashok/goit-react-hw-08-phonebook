import PrivatesRoute from 'components/PrivatesRoute/PrivatesRoute';
import RestrictedRoute from 'components/RestrictedRoute/RestrictedRoute';
import { lazy } from 'react';

const ContactsPage = lazy(() => import('page/ContactsPage/ContactsPage'));
const HomePage = lazy(() => import('page/HomePage/HomePage'));
const LoginPage = lazy(() => import('page/LoginPage/LoginPage'));

export const HOME_ROUTE = '/';
export const CONTACTS_ROUTE = '/contacts';
export const LOGIN_ROUTE = '/login';

export const appRoutes = [
  {
    path: HOME_ROUTE,
    element: <HomePage />,
  },
  {
    path: CONTACTS_ROUTE,
    element: (
      <PrivatesRoute>
        <ContactsPage />
      </PrivatesRoute>
    ),
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
];
