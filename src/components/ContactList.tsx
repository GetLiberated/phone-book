import { useQuery, gql } from '@apollo/client';
import ContactCard from './ContactCard';
import { GET_CONTACT_LIST } from '../graphql/queries';

export default function ContactList(): JSX.Element {

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
