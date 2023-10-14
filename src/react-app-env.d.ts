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