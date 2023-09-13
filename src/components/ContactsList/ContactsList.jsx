import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContact,
  getAllContacts,
  selectorContactsError,
  selectorContactsFiltered,
  selectorContactsIsLoading,
} from 'redux/contactsReducer';
import css from './ContactsList.module.css';
import Loader from 'components/Loader/Loader';

const ContactsList = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectorContactsError);
  const isLoading = useSelector(selectorContactsIsLoading);
  const contacts = useSelector(selectorContactsFiltered);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <>
      {error !== null && <p>{error}</p>}
      {isLoading && <Loader />}
      {contacts.length > 0 && !isLoading && (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id} className={css.itemContact}>
              <p className={css.contactName}>
                {contact.name}: <span>{contact.number}</span>
              </p>
              <div className={css.btnWrap}>
                <button
                  type="button"
                  className={css.deleteButton}
                  onClick={() => {
                    dispatch(deleteContact(contact.id));
                  }}
                >
                  <svg className={css.deleteSvgIcon} viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContactsList;
