import { css } from '@emotion/css'

export default function FavoriteCard({ id, first_name, last_name, phones }: IContact) {
    
    const card = css`
        width: 120px;
        gap: 0.8rem; 
    `

    const avatar = css`
        display: flex; 
        padding: 0.75rem; 
        justify-content: center; 
        align-items: center; 
        border-radius: 15px; 
        height: 96px;
        background-color: #429E25;
        font-size: 1.75rem;
        color: #ffffff;
    `

    const info = css`
        padding-top: 0.25rem;
        padding-bottom: 0.25rem; 
        text-align: center; 
    `

    const name = css`
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 0.25rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 
    `

    const phone = css`
        font-size: 0.875rem;
        line-height: 1.25rem; 
        margin: 0;
        color: #575757;
    `

    return (
        <div key={id} className={card}>
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