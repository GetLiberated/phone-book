import React from 'react';
import logo from './logo.svg';

import { css } from '@emotion/css'
import { useQuery, gql } from '@apollo/client';

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

function DisplayContactList(): JSX.Element {
  
  interface IContact {
    id: string;
    first_name: string;
    last_name: string;
    phones: {
      number: string;
    }[];
  }

  interface IContacts extends Array<IContact>{}

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
  
  return (
    <>
      {
        contacts.map(({ id, first_name, last_name, phones }) => (
          <div key={id}>
            <h3>{first_name} {last_name}</h3>
            <br />
            <b>Phone:</b>
            <p>{phones[0].number}</p>
            <br />
          </div>
        ))
      }
    </>
  )

}

function App() {
  return (
    <div 
      className={css`
      text-align: center;
    `}>
      <h2>Phone Book</h2>
      <br/>
      <DisplayContactList />
    </div>
  );
}

export default App;
