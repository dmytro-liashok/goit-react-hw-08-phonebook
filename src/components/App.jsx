import { Route, Routes } from 'react-router-dom';
import { appRoutes } from 'NavigationRouters/NavigationRouters';
import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser, selectorAuthenticated } from 'redux/authReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader/Loader';
const Navigation = lazy(() => import('./Navigatoin/Navigation'));
const LogOut = lazy(() => import('./LogOut/LogOut'));
const NotFound = lazy(() => import('page/NotFound/NotFound'));
const UserName = lazy(() => import('./UserName/UserName'));

export const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(selectorAuthenticated);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <header className="container">
        <Suspense fallback={<Loader />}>
          <Navigation />
          {authenticated && <UserName />}
          {authenticated && <LogOut />}
        </Suspense>
      </header>
      <main className="container">
        <Suspense fallback={<Loader />}>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
