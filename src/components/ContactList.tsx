import ContactCard from './ContactCard';

export default function ContactList({ contacts, onClick }: ContactListProps): JSX.Element {

    return <>
      { contacts.map(({ id, first_name, last_name, phones }) => <ContactCard id={ id } first_name={ first_name } last_name={ last_name } phones={ phones } onClick={onClick} />) }
    </>
  }
