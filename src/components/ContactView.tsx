import { css } from '@emotion/css'
import { useEffect, useState } from 'react'

export default function ContactView({ id, first_name, last_name, phones, onClick, isFavorite, favoriteClick }: ContactClickFavoriteClickProps) {

    const [showModal, setShowModal] = useState('')
    
    const avatar = css`
        display: flex; 
        padding: 3rem; 
        justify-content: center; 
        align-items: center; 
        border-radius: 9999px; 
        width: 50px; 
        height: 50px; 
        background-color: #429E25;
        font-size: 5rem;
        color: #ffffff;
        margin-top: -5rem;
        border: 10px solid white
    `

    const name = css`
        margin-left: 15px;
        margin-top: 0;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; 
        word-break: break-all;
    `

    const phone = css`
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 0;
        margin-bottom: 0.5rem;
        
        div {
            border-bottom: 1px solid #cfcfcf; 
            padding-bottom: 1rem;

            p {
                font-weight: 600;
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }

            a {
                color: #429E25;
                text-decoration: none;
            }
        }
    `

    const buttons = css`
        position: absolute; 
        right: 1rem; 
        bottom: 1rem;

        button {
            padding: 8px 10px;
            color: #FFFFFF;
            border: none;
            border-radius: 15px;
            cursor: pointer;
        }

        button:nth-child(1) {
            background-color: #60A5FA;
        }

        button:nth-child(2) {
            background-color: #FBBF24;
        }

        button:nth-child(3) {
            background-color: #F87171;
        }

    `

    const wrapper = css`
    .bottom-sheet-wrapper {
        .backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          transition: all 0.2s ease-in-out;
          z-index: 1;
      
          //     initially it will be hidden
          opacity: 0;
          pointer-events: none;
        }
      
        .bottom-sheet {
          background: #fff;
          width: 100%;
          min-height: 80%;
          position: fixed;
          z-index: 2;
          border-radius: 15px 15px 0 0;
          transition: all 0.2s ease-in-out;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); 
      
          //     centereing an absolute div
          left: 50%;
          transform: translateX(-50%);
      
          //     initially it will be pushed down out of the view.
          bottom: -110%;
        }
      
        &.show-modal {
          .backdrop {
            opacity: 1;
            pointer-events: all;
          }
      
          .bottom-sheet {
            bottom: 0;
          }
        }
      }
      
      .close {
        position: relative;
        width: 20px;
        height: 20px;
        float: right;
        margin: 20px;
        cursor: pointer;
      
        span {
          display: block;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          background: gray;
          transform: rotate(45deg);
      
          &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            border-radius: 2px;
            background: gray;
            transform: rotate(90deg);
          }
        }
      }
    `

    useEffect(() => {
        setShowModal('show-modal')
    }, [])

    return (
        <div className={wrapper}>
            <div className={"bottom-sheet-wrapper " + showModal}>
                <div className="backdrop" onClick={() => {setShowModal(''); setTimeout(()=>onClick(), 200)}}></div>
                <div className="bottom-sheet">
                    <div className="close center" onClick={() => {setShowModal(''); setTimeout(()=>onClick(), 200)}}>
                        <span></span>
                    </div>
                    <div className={avatar}>
                        {first_name[0]?.toUpperCase() || '' + last_name[0]?.toUpperCase() || ''}
                    </div>
                    <h1 className={name}>{first_name} {last_name}</h1> 
                    <div className={phone}>
                        {
                            phones.map((phone, i) => (
                                <div>
                                    <p>Phone {i+1}</p>
                                    <a href={'tel:' + phone.number}>{phone.number}</a>
                                </div>
                            ))
                        }
                    </div>
                    <div className={buttons}>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                <path d="M16 5l3 3"></path>
                            </svg>
                        </button>
                        <button onClick={() => favoriteClick()}>
                            {
                                isFavorite ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star-filled" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"></path>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
                                </svg>
                            }
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 7l16 0"></path>
                                <path d="M10 11l0 6"></path>
                                <path d="M14 11l0 6"></path>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}