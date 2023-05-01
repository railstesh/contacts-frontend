import React, { useState, useEffect, useCallback} from 'react';

import ContactList from './ContactList';
import '../App.css';
import AddContact from './AddContact'

function Home() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContactsHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);

    try
    {
      // v1 : for now using firebase database will replace with backend host once backend code is implemented.
      // v2 : for now using localhost backend database will replace with backend host once backend code is deployed.

      const response = await fetch("http://localhost:3001/contacts.json", {
        method: 'GET',
        'Content-Type': 'application/json'
      })

      if(!response.ok)
      {
        throw new Error("Something goes wrong!");
      }

      const data = await response.json();

      const transformedData = data['contacts'].map(c => ({
        id: c['id'],
        firstName: c['first_name'],
        lastName: c['last_name'],
        email: c['email'],
        phoneNumber: c['phone_number'],
      }))
      setContacts(transformedData);
    }
    catch(error)
    {
      setError(error.message);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchContactsHandler();
  },[fetchContactsHandler])

  async function addContactHandler(contact) {

    try{
        const response = await fetch("http://localhost:3001/contacts", {
        method: 'POST',
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
      setError(error.message);
    }
    fetchContactsHandler();
  }


  let content = <p>Not found any contacts..</p>;

  if (contacts.length > 0) {
    content = <ContactList contacts={contacts} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading .........</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddContact onAddContact={addContactHandler}/>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default Home;
