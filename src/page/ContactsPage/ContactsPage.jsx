import css from './ContactsPage.module.css';
import { lazy } from 'react';
const ContactFilter = lazy(() =>
  import('components/ContactFilter/ContactFilter')
);
const ContactsForm = lazy(() => import('components/ContactForm/ContactsForm'));
const ContactsList = lazy(() => import('components/ContactsList/ContactsList'));

const ContactsPage = () => {
  return (
    <div className={css.contactPage}>
      <section className={css.contactPageSection}>
        <ContactsForm />
      </section>
      <section>
        <ContactFilter />
        <ContactsList />
      </section>
    </div>
  );
};

export default ContactsPage;
