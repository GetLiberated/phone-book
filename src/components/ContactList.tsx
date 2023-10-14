import ContactCard from './ContactCard';

export default function ContactList({ contacts, favorites, onClick, pageNumber }: ContactsFavortiesClickIdPageProps): JSX.Element {

    return <>
      { 
        contacts.filter(contact => {
          return !favorites.find(favorite => {
            return favorite.id === contact.id;
          });
        }).slice((pageNumber - 1) * 10, pageNumber * 10).map(({ id, first_name, last_name, phones }) => <ContactCard id={ id } first_name={ first_name } last_name={ last_name } phones={ phones } onClick={onClick} />) 
      }
    </>
  }
