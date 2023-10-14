import { useQuery, gql } from '@apollo/client';
import { css } from '@emotion/css'
import ContactCard from './components/ContactCard';
import Header from './components/Header';

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

function App() {
  return (
    <div 
      className={css`
      width: 100%;
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
      <ContactList />
    </div>
  );
}

export default App;
