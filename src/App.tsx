import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/css'
import { useEffect, useState } from 'react';

import { GET_CONTACT_LIST } from './graphql/queries';

import Header from './components/Header';
import ContactList from './components/ContactList';
import FavoriteList from './components/FavoriteList';
import ContactView from './components/ContactView';

function App() {

  const [selected, setSelected] = useState<IContact | undefined>(undefined)
  const [contacts, setContacts] = useState<IContacts>([])

  const [getContacts, { loading, data }] = useLazyQuery(GET_CONTACT_LIST);

  const handleContactClick = (contactId: string) => {
    setSelected(contacts.find(contact => contact.id === contactId))
  };

  const handleRefreshClick = () => {
    getContacts()
    if (loading) return <p>Loading...</p>;
    if (data && data.contact) {
      setContacts(data.contact);
      localStorage.setItem('contacts', JSON.stringify(data.contact));
    }
  }

  useEffect(() => {
    let localContacts: string | null = localStorage.getItem('contacts')
    
    if (localContacts !== null) 
    setContacts(JSON.parse(localContacts))
  }, []);

  return (
    <div 
      className={css`
      padding: 1.5rem;
      @media screen and (min-width: 640px) {
        margin: auto;
        width: 640px;
      }
      @media screen and (min-width: 1024px) {
        margin: auto;
        width: 1024px;
      }
    `}>
      {
        selected &&
        <ContactView id={ selected.id } first_name={ selected.first_name } last_name={ selected.last_name } phones={ selected.phones } />
      }
      <Header />
      <FavoriteList />
      <ContactList contacts={ contacts } onClick={handleContactClick} />
    </div>
  );
}

export default App;
