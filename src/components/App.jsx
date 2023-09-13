import { Route, Routes } from 'react-router-dom';
import { appRoutes } from 'NavigationRouters/NavigationRouters';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser, selectorAuthenticated } from 'redux/authReducer';
import UserName from './UserName/UserName';
import ParticleBackground from './ParticleBackground/particleBackground';
const Navigation = lazy(() => import('./Navigatoin/Navigation'));
const LogOut = lazy(() => import('./LogOut/LogOut'));
const NotFound = lazy(() => import('page/NotFound/NotFound'));

export const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectorAuthenticated);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {/* <ParticleBackground /> */}
      <header className="container">
        <Suspense fallback={<div>loading...</div>}>
          <Navigation />
          {authenticated && <UserName />}
          {authenticated && <LogOut />}
        </Suspense>
      </header>
      <main className="container">
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};
