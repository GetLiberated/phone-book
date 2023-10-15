import { useLazyQuery, useMutation } from '@apollo/client';
import { css } from '@emotion/css'
import { useEffect, useState } from 'react';

import { GET_CONTACT_LIST, DELETE_CONTACT_BY_ID } from './graphql/queries';

import Header from './components/Header';
import ContactList from './components/ContactList';
import FavoriteList from './components/FavoriteList';
import ContactView from './components/ContactView';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import DesktopContactView from './components/DesktopContactView';

function App() {

  const [contacts, setContacts] = useState<IContacts>([])
  const [favorites, setFavorites] = useState<IContacts>([])
  const [selected, setSelected] = useState<IContact | undefined>(undefined)
  const [search, setSearch] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  const [getContacts] = useLazyQuery(GET_CONTACT_LIST);
  const [deleteContactById] = useMutation(DELETE_CONTACT_BY_ID)

  const handleContactClick = (contactId: string) => {
    setSelected(undefined)
    setTimeout(()=>setSelected(contacts.find(contact => contact.id === contactId)), 1)
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

  const handleCreateClick = () => {
    setSelected(undefined)
    setTimeout(()=>setSelected({ id: 'new', first_name: '', last_name: '', phones: [] }), 1)
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContactById({
        variables: { id: selected?.id },
        onCompleted: (data) => {
          if (data && data.delete_contact_by_pk.id === selected?.id) {
            refresh()
            setSelected(undefined)
          }
        }
      })
    }
  };

  const handleClose = () => {
    setSelected(undefined)
  };

  const refresh = () => {
    setIsLoading(true)
    getContacts({
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        if (data && data.contact) {
          setContacts(data.contact);
          localStorage.setItem('contacts', JSON.stringify(data.contact));
          if (selected)
          setSelected((data.contact as IContacts).find(contact => contact.id === selected.id))
          if (isDesktop)
          setSelected(contacts[0])
          setTimeout(()=>setIsLoading(false), 1000) // Fake loading because the real one is too fast.
        }
      }
    })
  }

  useEffect(() => {
    let localContacts: string | null = localStorage.getItem('contacts')
    if (localContacts !== null) {
      const contacts_: IContacts = JSON.parse(localContacts)
      setContacts(contacts_.filter(contact => (contact.first_name.toLowerCase() + ' ' + contact.last_name.toLowerCase()).includes(search.toLowerCase())))
      setPageNumber(1)
    }
  }, [search]);

  useEffect(() => {
    if (!selected) setSelected(contacts[0]);
  }, [isDesktop]);

  useEffect(() => {
    let localContacts: string | null = localStorage.getItem('contacts')
    if (localContacts !== null) 
    setContacts(JSON.parse(localContacts))
    else
    refresh()

    let localFavorites: string | null = localStorage.getItem('favorites')
    if (localFavorites !== null)
    setFavorites(JSON.parse(localFavorites))

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    window.matchMedia("(min-width: 1024px)").addEventListener('change', handler);

    if (window.innerWidth > 1024)
    setIsDesktop(true)
  }, []);

  return (
    <div 
      className={ isDesktop ? css`
      display: flex;
      height: 100vh;
    ` : ''}>
      <div 
        className={css`
        padding: 1.5rem;
        display: flex;
        @media screen and (min-width: 640px) {
          margin: auto;
          width: 640px;
        }
        @media screen and (min-width: 1024px) {
          margin: auto;
          width: 1024px;
        }
        @media screen and (min-width: 1280px) {
          margin: auto;
          width: 1280px;
        }
      `}>
          <div
            className={css`
            width: 100%;
            @media screen and (min-width: 1024px) {
              width: 35%;
            }
          `}>
            {
              (selected && !isDesktop) &&
              <ContactView id={ selected.id } first_name={ selected.first_name } last_name={ selected.last_name } phones={ selected.phones } onClick={handleClose} isFavorite={ favorites.some(contact => contact.id === selected.id) } favoriteClick={handleFavoriteClick} deleteClick={handleDeleteClick} refreshClick={refresh} />
            }
            <Header setSearch={setSearch} createClick={handleCreateClick} refreshClick={refresh} />
            {
              favorites.length > 0 &&
              <FavoriteList contacts={ favorites } onClick={handleContactClick} />
            }
            {
              isLoading ?
              <Loading />
              :
              contacts.length > 0 &&
              <>
                <ContactList contacts={ contacts } favorites={ favorites } onClick={handleContactClick} pageNumber={ pageNumber } />
                <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} contacts={ contacts } />
              </>
            }
          </div>
          {
            (selected && isDesktop) &&
              <DesktopContactView id={ selected.id } first_name={ selected.first_name } last_name={ selected.last_name } phones={ selected.phones } onClick={handleClose} isFavorite={ favorites.some(contact => contact.id === selected.id) } favoriteClick={handleFavoriteClick} deleteClick={handleDeleteClick} refreshClick={refresh} />
          }
        </div>
      </div>
  );
}

export default App;
