import React, { useState, useEffect, useCallback} from 'react';

import ContactList from './components/ContactList';
import './App.css';
import AddContact from './components/AddContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchContactsHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);

    try
    {
      // for now using firebase database will replace with backend host once backend code is implemented.
      const response = await fetch("https://testing-f9137-default-rtdb.firebaseio.com/contacts.json")

      if(!response.ok)
      {
        throw new Error("Something goes wrong!");
      }

      const data = await response.json();
      let transformedData = []
      for(let key in data){
        transformedData.push({
          id: key,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          email: data[key].email,
          phoneNumber: data[key].phoneNumber,
        })
      }
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
        const response = await fetch("https://testing-f9137-default-rtdb.firebaseio.com/contacts.json", {
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
      <section>
        <button onClick={fetchContactsHandler}>Fetch Contacts</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
