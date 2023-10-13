import React from 'react';
import logo from './logo.svg';
import './App.css';
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

function DisplayContactList() {
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  interface IContact {
    id: string;
    first_name: string;
    last_name: string;
    phones: {
      number: string;
    }[];
  }

  return data.contact.map(({ id, first_name, last_name, phones }: IContact) => (
    <div key={id}>
      <h3>{first_name} {last_name}</h3>
      <br />
      <b>Phone:</b>
      <p>{phones[0].number}</p>
      <br />
    </div>
  ));
}

function App() {
  return (
    <div className="App">
      <h2>Phone Book</h2>
      <br/>
      <DisplayContactList />
    </div>
  );
}

export default App;
