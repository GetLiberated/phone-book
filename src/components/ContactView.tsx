import { css } from '@emotion/css'
import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';

import { ADD_CONTACT_WITH_PHONES, ADD_NUMBER_TO_CONTACT, EDIT_CONTACT_BY_ID, EDIT_PHONE_NUMBER } from '../graphql/queries';

export default function ContactView({ id, first_name, last_name, phones, onClick, isFavorite, favoriteClick, deleteClick, refreshClick }: ContactClickFavoriteClickDeleteClickProps & RefreshClick) {

    const [showModal, setShowModal] = useState('')
    const [editMode, setEditMode] = useState(id === 'new' ? true : false)
    const [contact, setContact] = useState<IContact>({ id, first_name, last_name, phones })

    const [addContact] = useMutation(ADD_CONTACT_WITH_PHONES)
    const [addNumberToContact] = useMutation(ADD_NUMBER_TO_CONTACT)
    const [editContact] = useMutation(EDIT_CONTACT_BY_ID)
    const [editContactPhone] = useMutation(EDIT_PHONE_NUMBER)
    
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
        height: 60vh;
        overflow-y: auto;
        
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

            input {
                width: 95%;
                border: none;
                font-size: 1rem;
                outline: 2px solid transparent;
                outline-offset: 2px;
            }
        }
    `

    const buttons = css`
        position: absolute; 
        right: 1rem; 
        bottom: 1rem;
        background-color: white;
        padding: 0.5rem;
        border-radius: 15px;

        button {
            padding: 8px 10px;
            color: #FFFFFF;
            border: none;
            border-radius: 15px;
            cursor: pointer;
            margin-left: 8px;
        }

        button:nth-child(1) {
            background-color: #429C55;
        }

        button:nth-child(2) {
            background-color: ${editMode ? '#D22B2B' : '#FBBF24'};
        }

        button:nth-child(3) {
            background-color: #D22B2B;
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

    const hasSpecialCharacters = (input: string) => {
        // Define a regular expression pattern to match non-alphanumeric characters (excluding spaces)
        const pattern = /[^A-Za-z0-9\s]/;

        if (pattern.test(input))
        alert('Contact name must doesn\'t have a special character')
      
        // Use the test method to check if the input string contains any special characters
        return pattern.test(input);
      }
      

    const createContact = () => {
        let localContacts: string | null = localStorage.getItem('contacts')
        if (localContacts !== null) {
          const contacts_: IContacts = JSON.parse(localContacts)
          if (!contacts_.filter(contact_ => contact_.first_name.toLowerCase() === contact.first_name.toLowerCase() && contact_.last_name.toLowerCase() === contact.last_name.toLowerCase())) {
              if (!hasSpecialCharacters(contact.first_name+contact.last_name)) {
                  addContact({
                      variables: { first_name: contact.first_name, last_name: contact.last_name, phones: contact.phones },
                      onCompleted: (data) => {
                      if (data && data.insert_contact) {
                          refreshClick()
                          onClick()
                          setEditMode(editMode => !editMode)
                      }
                      },
                      onError: (error) => {
                      alert('Phone number already exist!')
                      }
                  })
              }
          }
            else {
                alert('Contact name already exist!')
            }
        }
    }

    const modifyContact = () => {
        if (contact.first_name === first_name && contact.last_name === last_name && contact.phones === phones) setEditMode(false)
        else
        if (!hasSpecialCharacters(contact.first_name+contact.last_name)) {
            if (contact.first_name !== first_name || contact.last_name !== last_name) {
                let localContacts: string | null = localStorage.getItem('contacts')
                if (localContacts !== null) {
                    const contacts_: IContacts = JSON.parse(localContacts)
                    if (contacts_.filter(contact_ => contact_.first_name.toLowerCase() === contact.first_name.toLowerCase() && contact_.last_name.toLowerCase() === contact.last_name.toLowerCase()).length === 0) {
                        editContact({
                            variables: {
                                id: contact.id,
                                _set: {
                                    first_name: contact.first_name,
                                    last_name: contact.last_name,
                                }
                            },
                            onCompleted: (data) => {
                                if (data && data.update_contact_by_pk) {
                                    refreshClick()
                                    setEditMode(editMode => !editMode)
                                }
                            },
                            onError: (error) => {
                                console.log(error)
                            }
                        })
                    }
                    else {
                        alert('Contact name already exist!')
                    }
                }
            }
            if (contact.phones !== phones) {
                if (phones.length === 0 || phones.length < contact.phones.length) {
                    addNumberToContact({
                        variables: {
                            contact_id: contact.id,
                            phone_number: contact.phones[phones.length === 0 ? 0 : contact.phones.length - 1].number
                        },
                        onCompleted: (data) => {
                            if (data && data.insert_phone) {
                                refreshClick()
                                setEditMode(editMode => !editMode)
                            }
                        },
                        onError: (error) => {
                            alert('Phone number already exist!')
                        }
                    })
                }
                else
                contact.phones.forEach((phone, i) => {
                    if (phone.number !== phones[i].number)
                        editContactPhone({
                            variables: {
                                pk_columns: {
                                    number: phones[i].number,
                                    contact_id: contact.id
                                },
                                new_phone_number: phone.number
                            },
                            onCompleted: (data) => {
                                if (data && data.update_phone_by_pk) {
                                    refreshClick()
                                    setEditMode(editMode => !editMode)
                                }
                            },

                            onError: (error) => {
                                alert('Phone number already exist!')
                            }
                        })
                })
            }
        }
    }

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
                        {
                            (contact.first_name[0]) &&
                            contact.first_name[0].toUpperCase()
                        }
                        {
                            (contact.last_name[0]) &&
                            contact.last_name[0].toUpperCase()
                        }
                    </div>
                    <h1 className={name}>
                        {
                            id === 'new' ?
                            <>{'New contact'}</>
                            :
                            editMode ?
                            <>{'Edit'}</>
                            :
                            <>{contact.first_name} {contact.last_name}</>
                        }
                    </h1> 
                    <div className={phone}>
                        {
                            editMode ?
                            <>
                                <div>
                                    <p>First name</p>
                                    <input type='text' placeholder='First name' onKeyUp={(e) => setContact(contact => ({...contact, first_name: (e.target as HTMLInputElement).value}))} defaultValue={contact.first_name} />
                                </div>
                                <div>
                                    <p>Last name</p>
                                    <input type='text' placeholder='Last name' onKeyUp={(e) => setContact(contact => ({...contact, last_name: (e.target as HTMLInputElement).value}))} defaultValue={contact.last_name} />
                                </div>
                                <div>
                                    <p>Phone 1</p>
                                    <input type='text' placeholder='Phone number' onKeyUp={(e) => {
                                        setContact((contact_) => {
                                            return { ...contact_, phones: [ { number: (e.target as HTMLInputElement).value } ] };
                                          });
                                    }} defaultValue={contact.phones[0]?.number} />
                                </div>
                                {
                                    phones.length > 0 &&
                                    <>
                                    {
                                        phones.map((phone, i) => {
                                            if (i !== 0) return (
                                            <div>
                                                <p>Phone {i+1}</p>
                                                <input type='text' placeholder='Phone number' onKeyUp={(e) => {
                                                    setContact((contact_) => {
                                                        const updatedNumber = contact_.phones.map((phone, index) => {
                                                        if (i === index) {
                                                            return { ...phone, number: (e.target as HTMLInputElement).value }; // Create a new object with the updated value
                                                        }
                                                        return phone;
                                                        });
                                                
                                                        return { ...contact_, phones: updatedNumber };
                                                    });
                                                }} defaultValue={phone.number} />
                                            </div>
                                        )})
                                    }
                                    <div>
                                        <p>Phone {phones.length+1}</p>
                                        <input type='text' placeholder='Phone number' onKeyUp={(e) => {
                                            setContact((contact_) => {
                                                if (contact_.phones.length === phones.length) {
                                                    return { ...contact_, phones: [ ...contact_.phones, { number: (e.target as HTMLInputElement).value } ] };
                                                }
                                                const updatedNumber = contact_.phones.map((phone, index) => {
                                                    if (phones.length-1 === index) {
                                                        return { ...phone, number: (e.target as HTMLInputElement).value }; // Create a new object with the updated value
                                                    }
                                                    return phone;
                                                });
                                        
                                                return { ...contact_, phones: updatedNumber };
                                              });
                                        }} />
                                    </div>
                                    </>
                                }
                            </>
                            :
                            contact.phones?.map((phone, i) => (
                                <div>
                                    <p>Phone {i+1}</p>
                                    <a href={'tel:' + phone.number}>{phone.number}</a>
                                </div>
                            ))
                        }
                    </div>
                    <div className={buttons}>
                        <button onClick={() => {
                            if (id === 'new') createContact();
                            else if (editMode) modifyContact(); 
                            else if (!editMode) setEditMode(true)
                        }}>
                            {
                                !editMode ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                    <path d="M16 5l3 3"></path>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                </svg>
                            }
                        </button>
                        {
                            !editMode &&
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
                        }
                        <button onClick={() => {
                            if (id === 'new') {setShowModal(''); setTimeout(()=>onClick(), 200)}
                            else if (editMode) { setEditMode(false); setContact({ id, first_name, last_name, phones }) }
                            else { setShowModal(''); setTimeout(()=>deleteClick(), 200) }
                        }}>
                            {
                                !editMode ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M4 7l16 0"></path>
                                    <path d="M10 11l0 6"></path>
                                    <path d="M14 11l0 6"></path>
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M18 6l-12 12"></path>
                                    <path d="M6 6l12 12"></path>
                                </svg>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}