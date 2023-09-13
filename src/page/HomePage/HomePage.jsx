import { useSelector } from 'react-redux';
import { selectorUserData } from 'redux/authReducer';
import css from './HomePage.module.css';

const HomePage = () => {
  const user = useSelector(selectorUserData);
  return (
    <div className={css.homePage}>
      <h1 className={css.homePageTitle}>
        Welcome to Pnonebook!{' '}
        <span className={css.homePageUserName}>{user?.name}</span>
      </h1>
      <p className={css.homePageDescription}>
        We offer you a unique opportunity to store and manage your phonebook
        easily and conveniently. Add your friends' numbers, quickly filter them
        and delete them as needed. Our site is designed to make your life more
        organized and convenient!
      </p>
    </div>
  );
};

export default HomePage;
