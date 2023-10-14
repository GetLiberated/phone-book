import ContactCard from './ContactCard';

export default function ContactList({ contacts, favorites, onClick, pageNumber }: ContactsFavortiesClickIdPageProps): JSX.Element {

    return <>
      { 
        contacts // Array of contacts
        .filter(contact => !favorites.find(favorite => favorite.id === contact.id)) // Remove favorite from contact list
        .sort((a, b) => a.first_name.localeCompare(b.first_name)) // Sort ascending alphabet by first name
        .slice((pageNumber - 1) * 10, pageNumber * 10) // Pagination
        .map(({ id, first_name, last_name, phones }) => <ContactCard id={ id } first_name={ first_name } last_name={ last_name } phones={ phones } onClick={onClick} />) // Contact's JSX Element
      }
    </>
  }
