import {
  CONTACTS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
} from 'NavigationRouters/NavigationRouters';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { selectorAuthenticated } from 'redux/authReducer';
import css from './Navigation.module.css';

const Navigation = () => {
  const authenticated = useSelector(selectorAuthenticated);

  return (
    <>
      <nav className="nav">
        <NavLink to={HOME_ROUTE} className={css.navItem}>
          Home
        </NavLink>
        {authenticated ? (
          <NavLink to={CONTACTS_ROUTE} className={css.navItem}>
            Contacts
          </NavLink>
        ) : (
          <NavLink to={LOGIN_ROUTE} className={css.navItem}>
            Log In
          </NavLink>
        )}
      </nav>
    </>
  );
};

export default Navigation;
