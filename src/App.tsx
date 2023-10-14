import { useQuery, gql } from '@apollo/client';
import { css } from '@emotion/css'
import ContactCard from './components/ContactCard';
import Header from './components/Header';
import FavoriteCard from './components/FavoriteCard';
import { useRef } from 'react';

const GET_CONTACT_LIST = gql`
  query GetContactList (
      $distinct_on: [contact_select_column!], 
      $limit: Int, 
      $offset: Int, 
      $order_by: [contact_order_by!], 
      $where: contact_bool_exp
  ) {
    contact(
        distinct_on: $distinct_on, 
        limit: $limit, 
        offset: $offset, 
        order_by: $order_by, 
        where: $where
    ){
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;

function ContactList(): JSX.Element {

  let contacts: IContacts = [];
  let localContacts: string | null = localStorage.getItem('contacts')
  let skip: boolean = false
  
  if (localContacts !== null) {
    skip = true
    contacts = JSON.parse(localContacts)
  }
  
  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {skip});
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) {
    contacts = data.contact;
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  
  return <>
    { contacts.map(({ id, first_name, last_name, phones }) => <ContactCard id={ id } first_name={ first_name } last_name={ last_name } phones={ phones } />) }
  </>
}

function FavoriteList(): JSX.Element {

  let contacts: IContacts = [];
  let localContacts: string | null = localStorage.getItem('contacts')
  
  if (localContacts !== null)
  contacts = JSON.parse(localContacts)

  const favRef = useRef<HTMLDivElement>(null) 

  const list = css`
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    scroll-behavior: smooth;
    scroll-snap-type: x var(--tw-scroll-snap-strictness);
    gap: 1rem; 
    overflow-x: scroll;

    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
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
  
  return <>
    <h2>Favorite</h2>
    <div className={css`
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    `} >
      <button onClick={() => {
          if (favRef.current !== null) {
            favRef.current.scrollLeft -= 200
          }
        }} className={button}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M15 6l-6 6l6 6"></path>
          </svg>
      </button>
      <div className={list} ref={favRef} >
      { 
        contacts.map(({ id, first_name, last_name, phones }) => <FavoriteCard id={ id } first_name={ first_name } last_name={ last_name } phones={ phones } />) 
      }
      </div>
      <button onClick={() => {
          if (favRef.current !== null) {
            favRef.current.scrollLeft += 200
          }
        }} className={button}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
          </svg>
      </button>
    </div>
  </>
}

function App() {
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
      <Header />
      <FavoriteList />
      <ContactList />
    </div>
  );
}

export default App;
