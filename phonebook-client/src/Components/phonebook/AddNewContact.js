import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Loader from "../Helpers/Loader";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const BASE_URL = process.env.REACT_APP_BASE_URL
const TOKEN = process.env.REACT_APP_BEARER


function AddNewContact({contact}) {
  let [show, setShow] = useState(false);
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("Add Contact Information");
  const [status, setStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  let checkIfEmpty=(str)=>{
    return (!str || str.length === 0 );
  }

  const handleClose = () =>{
    setShow(false);
    if(status){
      window.location.reload(false);
    }
  }
  const handleShow = () => setShow(true);

  let handleSubmit = async (e) => {
    e.preventDefault();
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
      let resJson = await res.json();
      if (res.status === 200) {
        setIsSubmitting(false)
        setStatus(true)
        setFirstname("");
        setLastname("");
        setMobileNumber("");
        setMessage("User created successfully");
      } else {
        setMessage("Saving failed. Please try again later");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={handleShow} id="showModal" className="btn btn-primary mb-4 float-end"><i className="fa fa-plus"></i> Add Contact</button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/*<div className="message">{message ? <p>{message}</p> : null}</div>*/}
          <Loader
              message={message}
              status={status}
              isSubmitting={isSubmitting}
          />
          <Form onSubmit={handleSubmit}>
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
                  placeholder="Example: 0996021167"
                  value={mobileNumber}
                  onChange={setMobileNumber}
                  autoFocus
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
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewContact;