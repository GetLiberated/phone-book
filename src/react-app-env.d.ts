/// <reference types="react-scripts" />

interface IContact {
    id: string;
    first_name: string;
    last_name: string;
    phones: {
      number: string;
    }[];
}

type IContacts = Array<IContact>

interface ContactsProp {
  contacts: IContacts;
}

interface FavoritesProp {
  favorites: IContacts;
}

interface OnClickIdProp {
  onClick: (id: string) => void;
}

interface OnClickProp {
  onClick: () => void;
}

interface FavoriteProp {
  isFavorite: boolean;
  favoriteClick: () => void;
}

interface SearchProp {
  setSearch: Dispatch<SetStateAction<string>>;
}

interface PageNumber {
  pageNumber: number;
}

type ContactClickIdProps = IContact & OnClickIdProp

type ContactsClickIdProps = ContactsProp & OnClickIdProp 

type ContactClickProps = IContact & OnClickProp

type ContactsClickProps = ContactsProp & OnClickProp

type ContactClickFavoriteClickProps = ContactClickProps & FavoriteProp

type ContactsClickIdPageProps = ContactsClickIdProps & PageNumber

type ContactsFavortiesClickIdPageProps = ContactsClickIdPageProps & FavoritesProp