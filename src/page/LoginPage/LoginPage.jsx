import { useDispatch } from 'react-redux';
import css from './LoginPage.module.css';
import { signUpUser, logInUser } from 'redux/authReducer';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleSignUp = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.pswd.value;
    const formData = {
      name,
      email,
      password,
    };
    dispatch(signUpUser(formData));
    event.currentTarget.reset();
  };

  const handleLogIn = event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.pswd.value;
    const formData = {
      email,
      password,
    };
    dispatch(logInUser(formData));
    event.currentTarget.reset();
  };

  return (
    <>
      <input type="checkbox" id={css.chk} aria-hidden="true" />
      <div className={css.mainForm}>
        <div className={css.signup}>
          <form onSubmit={handleSignUp}>
            <label className={css.label} htmlFor={css.chk} aria-hidden="true">
              Sign up
            </label>
            <input
              className={css.input}
              type="text"
              name="name"
              placeholder="User name"
              required
              minLength={2}
            />
            <input
              className={css.input}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className={css.input}
              type="password"
              name="pswd"
              placeholder="Password"
              required
              minLength={4}
            />
            <button className={css.button}>Sign up</button>
          </form>
        </div>

        <div className={css.login}>
          <form onSubmit={handleLogIn}>
            <label className={css.label} htmlFor={css.chk} aria-hidden="true">
              Login
            </label>
            <input
              className={css.input}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            <input
              className={css.input}
              type="password"
              name="pswd"
              placeholder="Password"
              required
              minLength={4}
            />
            <button className={css.button}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
