import React, { useState } from 'react';

import ContactList from './components/ContactList';
import './App.css';

function App() {
  // const dummyContacts = [
  //   {
  //     id: 1,
  //     firstName: "John",
  //     lastName: "Wick",
  //     email: "johnwick@gmail.com",
  //     phoneNumber: "+91 9981239889",
  //   },
  //   {
  //     id: 2,
  //     firstName: "Jack",
  //     lastName: "Tan",
  //     email: "jacktan@gmail.com",
  //     phoneNumber: "+91 99812394343",
  //   },
  // ];

  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchContactsHandler(){
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
      for(let key in data){transformedData.push(data[key])}
      setContacts(transformedData);
    }
    catch(error)
    {
      setError(error.message);
    }
    setIsloading(false);
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
        <button onClick={fetchContactsHandler}>Fetch Contacts</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
