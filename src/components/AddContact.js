import React, { useRef } from 'react';

import classes from './AddContact.module.css';

function AddContact(props) {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const emailRef = useRef('');
  const phoneNumberRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // Get input values
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phoneNumber = phoneNumberRef.current.value.trim();

    // Validate input
    if (!firstName) {
      alert('Please enter a first name.');
      return;
    }
    if (!lastName) {
      alert('Please enter a last name.');
      return;
    }
    if (!email) {
      alert('Please enter an email.');
      return;
    }
    if (!phoneNumber) {
      alert('Please enter a phone number.');
      return;
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid phone number (10 digits).');
      return;
    }

    // Create contact object
    const contact = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
    };

    // Add contact
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
