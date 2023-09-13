import React from 'react';
import css from './ContactsForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsReducer';

const nameId = nanoid();
const telId = nanoid();

const ContactsForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const number = event.target.number.value;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    dispatch(addContact(newContact));
    event.currentTarget.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form} autoComplete="off">
        <label htmlFor={nameId} className={css.label}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            id={nameId}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            maxLength={20}
          />
        </label>
        <label htmlFor={telId} className={css.label}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            id={telId}
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            maxLength={12}
            required
          />
        </label>
        <button type="submit" className={css.buttonSubmit}>
          <span className={css.button__text}>Add Contact</span>
          <span className={css.button__icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className={css.svgBtn}
            >
              <line y2="19" y1="5" x2="12" x1="12"></line>
              <line y2="12" y1="12" x2="19" x1="5"></line>
            </svg>
          </span>
        </button>
      </form>
    </>
  );
};

export default ContactsForm;
