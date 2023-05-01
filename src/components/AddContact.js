import React, { useRef, useState } from 'react';

import classes from './AddContact.module.css';

function AddContact(props) {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const emailRef = useRef('');
  const phoneNumberRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const contact = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      phone_number: phoneNumberRef.current.value,
    };

    props.onAddContact(contact);
    resetForm();
  }

  function resetForm()
  {
    firstNameRef.current.value = ''
    lastNameRef.current.value = ''
    emailRef.current.value = ''
    phoneNumberRef.current.value = ''
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='firstName'>First Name</label>
        <input type='text' id='firstName' ref={firstNameRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='lastName'>Last Name</label>
        <input type='text' id='lastName' ref={lastNameRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' ref={emailRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor='phoneNumber'>Phone Number</label>
        <input type='number' id='phoneNumber' ref={phoneNumberRef}/>
      </div>
      <button>Add Contact</button>
    </form>
  );
}

export default AddContact;
