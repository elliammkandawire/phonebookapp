import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Loader from "../Helpers/Loader";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN = process.env.REACT_APP_BEARER



function DeleteContact({phoneNumber}) {
    let [show, setShow] = useState(true);
    let [mobileNumber, setMobileNumber] = useState("");
    const [message, setMessage] = useState("Are you sure you want to delete this contact?");
    const [status, setStatus] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    let submitDetails = async (e) => {
        setIsSubmitting(true)
        try {
            let res = await fetch(`${BASE_URL}/delete/${mobileNumber}`, {
                method: "DELETE",
                headers: new Headers({'content-type': 'application/json', 'Authorization': `Bearer ${TOKEN}`})
            });
            if (res.status === 200) {
                setIsSubmitting(false)
                setStatus(true)
                setMessage("Contact Deleted successfully");
            } else {
                setMessage("Contact Delete failed");
            }
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setMobileNumber(phoneNumber);
    }, [])

    const close = () =>{
        window.location.reload(false);
    }
    return (
        <>
            <Modal show={show} onHide={close} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Contact to Delete</Modal.Title>
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
                            <PhoneInput
                                className="form-control"
                                defaultCountry="MW"
                                value={mobileNumber}
                                readOnly={true}
                                onChange={setMobileNumber}
                                placeholder="Example: 996021167"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={submitDetails}>
                        Delete Contact
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteContact;