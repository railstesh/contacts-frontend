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

  function fetchContactsHandler(){
    // for now using firebase database will replace with backend host once backend code is implemented.
    fetch("https://testing-f9137-default-rtdb.firebaseio.com/contacts.json").then(response => {
      return response.json();
    }).then(data => {
      const transformedData = []
      for(let key in data){transformedData.push(data[key])}
      setContacts(transformedData);
    })
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchContactsHandler}>Fetch Contacts</button>
      </section>
      <section>
        <ContactList contacts={contacts} />
      </section>
    </React.Fragment>
  );
}

export default App;
