import { useSelector } from 'react-redux';
import { selectorUserData } from 'redux/authReducer';
import css from './UserName.module.css';

const UserName = () => {
  const { name } = useSelector(selectorUserData);
  return <p className={css.userName}>Welcome {name}!</p>;
};

export default UserName;
