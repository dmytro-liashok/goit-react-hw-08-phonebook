import ContactFilter from 'components/ContactFilter/ContactFilter';
import ContactsForm from 'components/ContactForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import css from "./ContactsPage.module.css"

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
