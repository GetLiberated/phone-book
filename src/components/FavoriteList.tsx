import { css } from '@emotion/css'
import FavoriteCard from './FavoriteCard';
import { useRef } from 'react';

export default function FavoriteList(): JSX.Element {

    let contacts: IContacts = [];
    let localContacts: string | null = localStorage.getItem('favorites')

    const favRef = useRef<HTMLDivElement>(null) 

    if (localContacts !== null) {
        contacts = JSON.parse(localContacts)

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

    return <></>
}
