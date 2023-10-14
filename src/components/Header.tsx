import { css } from '@emotion/css'

export default function Header({ setSearch }: SearchProp) {
    
    const header = css`
        display: flex; 
        justify-content: center; 
        width: 100%;
        position: relative; 
        padding-bottom: 1rem;
    `

    const create = css`
        position: absolute; 
        right: 0px; 
        top: 1.6rem;
        padding: 8px 10px;
        color: #FFFFFF;
        background-color: #429C55;
        border: none;
        border-radius: 15px;
        cursor: pointer;
    `

    const search = css`
        position: relative;
        display: flex; 

        input {
            flex-grow: 1;
            padding: 1rem;
            padding-left: 3rem;
            background-color: #F3F4F6;
            border: none;
            border-radius: 15px;
            font-size: 0.9rem;
            outline: 2px solid transparent;
            outline-offset: 2px;
        }
    `

    const icon = css`
        display: flex; 
        position: absolute; 
        top: 0;
        bottom: 0; 
        left: 0; 
        padding-left: 1.5rem; 
        align-items: center; 
        pointer-events: none; 
        color: #575757;
    `

    return (
        <>
            <div className={header}>
                <h2>Phone Book</h2>
                <button className={create}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-plus" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 5l0 14"></path>
                        <path d="M5 12l14 0"></path>
                    </svg>
                </button>
            </div>
            <div className={search}>
                <div className={icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                        <path d="M21 21l-6 -6"></path>
                    </svg>
                </div>
                <input type="text" placeholder='Search' onKeyUp={(e) => setSearch((e.target as HTMLInputElement).value as string) }/>
            </div>
        </>
    )
}