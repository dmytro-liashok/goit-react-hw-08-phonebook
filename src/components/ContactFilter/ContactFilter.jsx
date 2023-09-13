import { useDispatch } from 'react-redux';
import css from './ContactFilter.module.css';
import { setFilter } from 'redux/filterReduce';
import { nanoid } from 'nanoid';

const ContactFilter = () => {
  const filterId = nanoid();
  const dispatch = useDispatch();

  const handleChange = event => {
    const valueFilter = event.target.value;
    dispatch(setFilter(valueFilter));
  };
  return (
    <>
      <label htmlFor={filterId} className={css.labelFilter}>
        <span className={css.spanFilter}>Find Contacts by name</span>
        <input
          className={css.inputFilter}
          onChange={handleChange}
          id={filterId}
        />
      </label>
    </>
  );
};

export default ContactFilter;
