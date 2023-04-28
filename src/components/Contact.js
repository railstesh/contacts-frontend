import React from 'react';

import classes from './Contact.module.css';

const Contact = (props) => {
  return (
    <li className={classes.contact}>
      <h2>{props.firstName}</h2>
      <h3>{props.lastName}</h3>
      <p>{props.email}</p>
      <p>{props.phoneNumber}</p>
    </li>
  );
};

export default Contact;
