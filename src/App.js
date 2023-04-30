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

  async function fetchContactsHandler(){
    setIsloading(true);

    // for now using firebase database will replace with backend host once backend code is implemented.
    const response = await fetch("https://testing-f9137-default-rtdb.firebaseio.com/contacts.json")
    const data = await response.json();

    let transformedData = []
    for(let key in data){transformedData.push(data[key])}
    setContacts(transformedData);
    setIsloading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchContactsHandler}>Fetch Contacts</button>
      </section>
      <section>
        {!isLoading && contacts.length > 0 &&< ContactList contacts={contacts} />}
        {!isLoading && contacts.length === 0 && <p>Found no contacts.</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
