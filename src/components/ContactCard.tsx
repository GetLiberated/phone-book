import { css } from '@emotion/css'

export default function ContactCard({ id, first_name, last_name, phones, onClick }: ContactClickIdProps) {
    
    const card = css`
        width: 100%
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
        display: flex;
        gap: 0.8rem; 
        cursor: pointer;
    `

    const avatar = css`
        display: flex; 
        padding: 0.75rem; 
        justify-content: center; 
        align-items: center; 
        border-radius: 9999px; 
        width: 33px; 
        height: 33px; 
        background-color: #429E25;
        font-size: 1.75rem;
        color: #ffffff;
    `

    const info = css`
        border-bottom: 1px solid #cfcfcf; 
        flex-grow: 1;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem; 
    `

    const name = css`
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 
        word-break: break-all;
    `

    const phone = css`
        font-size: 0.875rem;
        line-height: 1.25rem; 
        margin: 0;
        color: #575757;
    `

    return (
        <div key={id} className={card} onClick={() => onClick(id)}>
            <div className={avatar}>
                {first_name[0].toUpperCase() + last_name[0].toUpperCase()}
            </div>
            <div className={info}>
                <p className={name}>{first_name} {last_name}</p>
                <p className={phone}>{phones[0].number}</p>
            </div>
        </div>
    )
}