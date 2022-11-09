import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Loader from "../Helpers/Loader";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN = process.env.REACT_APP_BEARER

function EditContact({contact}) {
    let [show, setShow] = useState(true);
    let [firstname, setFirstname] = useState("");
    let [lastname, setLastname] = useState("");
    let [mobileNumber, setMobileNumber] = useState("");
    const [message, setMessage] = useState("Contact Information");
    const [status, setStatus] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    let checkIfEmpty=(str)=>{
        return (!str || str.length === 0 );
    }

    let submitDetails = async (e) => {
        setIsSubmitting(true)
        if(checkIfEmpty(firstname) || checkIfEmpty(lastname) || checkIfEmpty(mobileNumber)){
            setMessage("Please fill all the information");
            setStatus(false)
            setIsSubmitting(false)
            return false
        }
        try {
            let res = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: new Headers({'content-type': 'application/json', 'Authorization': `Bearer ${TOKEN}`}),
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    phoneNumber: mobileNumber,
                }),
            });
            if (res.status === 200) {
                setIsSubmitting(false)
                setStatus(true)
                setMessage("User Updated successfully");
            } else {
                setMessage("Editing failed. Please try again later");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setFirstname(contact.firstname)
        setLastname(contact.lastname);
        setMobileNumber(contact.phoneNumber);
    }, [])

    const handleClose = () =>{
        setShow(false);
        window.location.reload(false);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Loader
                        message={message}
                        status={status}
                        isSubmitting={isSubmitting}
                    />
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            {/*<Form.Control*/}
                            {/*  type="number"*/}
                            {/*  value={mobileNumber}*/}
                            {/*  onInput={formatPhone}*/}
                            {/*  onChange={(e) => setMobileNumber(e.target.value)}*/}
                            {/*  placeholder="Example: 265882784684"*/}
                            {/*  autoFocus*/}
                            {/*/>*/}

                            <PhoneInput
                                className="form-control"
                                defaultCountry="MW"
                                value={mobileNumber}
                                onChange={setMobileNumber}
                                placeholder="Example: 996021167"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Enter your first name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Enter your last name"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitDetails}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditContact;