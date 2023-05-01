import React from 'react';

import Contact from './Contact';
import classes from './ContactsList.module.css';

const ContactList = (props) => {
  return (
    <ul className={classes['contacts-list']}>
      {props.contacts.map((contact) => (
        <Contact
          key={contact.id}
          id={contact.id}
          firstName={contact.firstName}
          lastName={contact.lastName}
          email={contact.email}
          phoneNumber={contact.phoneNumber}
        />
      ))}
    </ul>
  );
};

export default ContactList;
