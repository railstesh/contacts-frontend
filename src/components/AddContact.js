import React, { useRef, useState } from 'react';

import classes from './AddContact.module.css';

function AddContact(props) {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const emailRef = useRef('');
  const phoneNumberRef = useRef('');
  const [error, setError] = useState(null)

  async function submitHandler(event) {
    event.preventDefault();

    // Get input values
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const phoneNumber = phoneNumberRef.current.value.trim();

    // Validate input
    let validate_message = validateInput(firstName, lastName, email, phoneNumber);

    if(validate_message)
    {
      alert(validate_message)
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
    const res = await props.onAddContact(contact);
    console.log('res', res);
    setError(res)
    resetForm();
  }

  function validateInput(firstName, lastName, email, phoneNumber) {
    if (!firstName) {
      return 'Please enter a first name.';
    }
    if (!lastName) {
      return 'Please enter a last name.';
    }
    if (!email) {
      return 'Please enter an email.';
    }
    if (!phoneNumber) {
      return 'Please enter a phone number.';
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return 'Please enter a valid phone number (10 digits).';
    }
    return null;
  }

  function resetForm()
  {
    firstNameRef.current.value = ''
    lastNameRef.current.value = ''
    emailRef.current.value = ''
    phoneNumberRef.current.value = ''
  }

  console.log(props)

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
      {error && <p>{error}</p>}
    </form>
  );
}

export default AddContact;
