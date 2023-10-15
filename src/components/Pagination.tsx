import { css } from '@emotion/css'

export default function Pagination({ pageNumber, setPageNumber, contacts }: PageNumber & SetPageNumber & ContactsProp ) {
    
    const pagination = css`
        display: flex;
        justify-content: center;
        item-align: center;
        gap: 0.5rem;

        p {
        display: inline-block; 
        }
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

    return (
      <div className={pagination}>
        <button onClick={() => {setPageNumber(pageNumber - 1)}} className={button} disabled={pageNumber === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 6l-6 6l6 6"></path>
            </svg>
        </button>
        <p>
          {pageNumber} / {Math.ceil(contacts.length/10)}
        </p>
        <button onClick={() => {setPageNumber(pageNumber + 1)}} className={button} disabled={pageNumber*10 > contacts.length}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
            </svg>
        </button>
      </div>
    )
}