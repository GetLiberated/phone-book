import { useLazyQuery } from '@apollo/client';
import { css } from '@emotion/css'
import { useEffect, useState } from 'react';

import { GET_CONTACT_LIST } from './graphql/queries';

import Header from './components/Header';
import ContactList from './components/ContactList';
import FavoriteList from './components/FavoriteList';
import ContactView from './components/ContactView';

function App() {

  const [contacts, setContacts] = useState<IContacts>([])
  const [favorites, setFavorites] = useState<IContacts>([])
  const [selected, setSelected] = useState<IContact | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const [getContacts, { loading, data }] = useLazyQuery(GET_CONTACT_LIST, {
    onCompleted: (data) => {
      if (data && data.contact) {
        setContacts(data.contact);
        localStorage.setItem('contacts', JSON.stringify(data.contact));
      }
    }
  });

  const handleContactClick = (contactId: string) => {
    setSelected(contacts.find(contact => contact.id === contactId))
  };

  const handleFavoriteClick = () => {
    if (selected) {
      const isFavorite = favorites.some(contact => contact.id === selected.id)
      let arr;
      if (!isFavorite)
      arr = [...favorites, selected]
      else 
      arr = favorites.filter(contact => contact.id !== selected.id);
      setFavorites(arr);
      localStorage.setItem('favorites', JSON.stringify(arr));
    }
  };

  const handleClose = () => {
    setSelected(undefined)
  };

  const refresh = () => {
    getContacts()
  }

  useEffect(() => {
    let localContacts: string | null = localStorage.getItem('contacts')
    if (localContacts !== null) {
      const contacts_: IContacts = JSON.parse(localContacts)
      setContacts(contacts_.filter(contact => contact.first_name.toLowerCase().includes(search.toLowerCase()) || contact.last_name.toLowerCase().includes(search.toLowerCase())))
      setPageNumber(1)
    }
  }, [search]);

  useEffect(() => {
    refresh()

    let localContacts: string | null = localStorage.getItem('contacts')
    if (localContacts !== null) 
    setContacts(JSON.parse(localContacts))

    let localFavorites: string | null = localStorage.getItem('favorites')
    if (localFavorites !== null)
    setFavorites(JSON.parse(localFavorites))
  }, []);

  const pagination = css`
  display: flex;
    justify-content: center;
    item-align: center;
    gap: 0.5rem;

    p {
      display: inline-block; 
    }
  `

    const button = css`
        padding-left: 0.25rem;
        padding-right: 0.25rem; 
        border-radius: 9999px; 
        border-width: 1px; 
        background-color: #F3F4F6; 
        border: none;
        color: inherit;
        font: inherit;
        cursor: pointer;
        outline: inherit;
    `

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
        <ContactView id={ selected.id } first_name={ selected.first_name } last_name={ selected.last_name } phones={ selected.phones } onClick={handleClose} isFavorite={ favorites.some(contact => contact.id === selected.id) } favoriteClick={handleFavoriteClick} />
      }
      <Header setSearch={setSearch} />
      {
        favorites.length > 0 &&
        <FavoriteList contacts={ favorites } onClick={handleContactClick} />
      }
      {
        contacts.length > 0 &&
        <ContactList contacts={ contacts } favorites={ favorites } onClick={handleContactClick} pageNumber={ pageNumber } />
      }
      <div className={pagination}>

        <button onClick={() => {setPageNumber(pageNumber => pageNumber - 1)}} className={button} disabled={pageNumber === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 6l-6 6l6 6"></path>
            </svg>
        </button>
        <p>
          {pageNumber}
        </p>
        <button onClick={() => {setPageNumber(pageNumber => pageNumber + 1)}} className={button} disabled={pageNumber*10 > contacts.length}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
            </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
