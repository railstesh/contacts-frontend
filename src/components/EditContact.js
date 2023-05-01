import React, { useRef, useEffect, useState, useCallback } from 'react';

import classes from './AddContact.module.css';
import { useParams } from 'react-router-dom';
import EditVersionList from './EditVersionList';

function EditContact(props) {
  const firstNameRef = useRef('');
  const lastNameRef = useRef('');
  const emailRef = useRef('');
  const phoneNumberRef = useRef('');

  const [editVersions, setEditVersions] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();

  const get_contact = useCallback( async () => {
    try{
        const response = await fetch(`http://localhost:3001/contacts/${params.contactId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      let contact = data['contact'];
      firstNameRef.current.value = contact.first_name
      lastNameRef.current.value = contact.last_name
      emailRef.current.value = contact.email
      phoneNumberRef.current.value = contact.phone_number
    }
    catch(error)
    {
      // setError(error.message);
    }
  }, [])

  const fetchEditVersionsHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);

    try
    {
      // Fetching edit versions here.
      const response = await fetch(`http://localhost:3001/contacts/${params.contactId}/edit_versions`, {
        method: 'GET',
        'Content-Type': 'application/json'
      })

      if(!response.ok)
      {
        throw new Error("Something goes wrong!");
      }

      const data = await response.json();

      setEditVersions(data['edit_versions']);
    }
    catch(error)
    {
      setError(error.message);
    }
    setIsloading(false);
  }, []);


  useEffect(() => {
    get_contact();
    fetchEditVersionsHandler();
  },[get_contact, fetchEditVersionsHandler])

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

    // edit contact object
    const contact = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
    };

    editContactHandler(contact);
  }

  async function editContactHandler(contact) {

    try{
        const response = await fetch(`http://localhost:3001/contacts/${params.contactId}`, {
        method: 'PUT',
        body: JSON.stringify(contact),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log(data)
    }
    catch(error)
    {
      // setError(error.message);
    }
    fetchEditVersionsHandler();
  }

  let content = <p>No edit versions for this contact.</p>;

  if (editVersions.length > 0) {
    content = <EditVersionList editVersions={editVersions} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading .........</p>;
  }

  return (
    <>
      <section>
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
          <button>Edit Contact</button>
        </form>
      </section>
      <section>{content}</section>
    </>

  );
}

export default EditContact;
