import React from 'react';

import ContactList from './components/ContactList';
import './App.css';

function App() {
  const dummyContacts = [
    {
      id: 1,
      firstName: "John",
      lastName: "Wick",
      email: "johnwick@gmail.com",
      phoneNumber: "+91 9981239889",
    },
    {
      id: 2,
      firstName: "Jack",
      lastName: "Tan",
      email: "jacktan@gmail.com",
      phoneNumber: "+91 99812394343",
    },
  ];

  return (
    <React.Fragment>
      <section>
        <button>Fetch Contacts</button>
      </section>
      <section>
        <ContactList contacts={dummyContacts} />
      </section>
    </React.Fragment>
  );
}

export default App;
