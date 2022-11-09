import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../App.css';
import AddNewContact from "./AddNewContact";
import React, {useEffect, useState} from "react";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN = process.env.REACT_APP_BEARER

function Phonebook() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    let getContactDetails = async (phone) => {
        try {
            let res = await fetch(`${BASE_URL}/single/${phone}`, {
                headers: new Headers({
                    method: 'GET',
                    'Authorization': `Bearer ${TOKEN}`
                })
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setContact(resJson)
            }
        } catch (err) {
            console.log(err);
        }
    };

    let searchData = async (lastname) => {
        try {
            let res = await fetch(`${BASE_URL}/search/${lastname}`,{
                headers: new Headers({
                    method: 'GET',
                    'Authorization': `Bearer ${TOKEN}`
                })
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setIsLoaded(true);
                setContacts(resJson);
            }
        } catch (err) {
            console.log(err);
        }
    };

    let deleteContact = async (phone) => {
        setPhoneNumber(phone)
    };

    useEffect(() => {
        fetch(`${BASE_URL}/all`,{
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${TOKEN}`
            })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setContacts(result);
                },
                (error) => {
                    setIsLoaded(true);
                    console.log("ERROR IS ",error)
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (

            <div className="container pt-5">
                <div>
                    <div className="row">
                        <div className="col-sm-6"><h2 className="float-start">Contacts</h2></div>
                        <div className="col-sm-6">
                            <AddNewContact/>
                        </div>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="text" id="search" onChange={(e) => searchData(e.target.value)} placeholder="&#xF002; Search for contact name by last name" className="form-control fontAwesome" />
                    </div>
                    {contact ?
                        <EditContact contact={contact} /> :
                        null
                    }

                    {phoneNumber ?
                        <DeleteContact phoneNumber={phoneNumber} /> :
                        null
                    }
                    <div className="row p-2">
                        {contacts?.map((contact, index) => (
                            <div data-index={index}  className="alert alert-light border border-secondary" role="alert">
                                <div className="row">
                                    <div className="col-sm-6 float-start" style={{cursor:'pointer'}}  onClick={() => getContactDetails(contact.phoneNumber)}>
                                        <h3 >{contact.firstname} {contact.lastname}</h3>
                                        <span><i className="fa fa-phone"></i> {contact.phoneNumber}</span>
                                    </div>
                                    <div className="col-sm-6">
                                        <button style={{cursor:'pointer'}} onClick={() => deleteContact(contact.phoneNumber)} type="submit" className="btn btn-danger mb-4 float-end"><i className="fa fa-trash-o"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Phonebook;
