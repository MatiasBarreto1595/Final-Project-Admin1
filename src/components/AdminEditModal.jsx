import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPenToSquare } from "react-icons/fa6";
import { useSelector } from "react-redux";

function AdminEditModal({ admin, setRefresh, refresh }) {
  const myAdmin = useSelector((state) => state.admin);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstnameInput, setFirstnameInput] = useState(admin.firstname);
  const [lastnameInput, setLastnameInput] = useState(admin.lastname);
  const [emailInput, setEmailInput] = useState(admin.email);

  const submitEdit = async (e) => {
    e.preventDefault();
    await axios({
      method: "patch",
      url: `${import.meta.env.VITE_URL_BASE_API}/admin/${admin._id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
      data: {
        firstname: firstnameInput && e.target.firstname.value,
        lastname: lastnameInput && e.target.lastname.value,
        email: emailInput && e.target.email.value,
      },
    });
    setRefresh(!refresh);
  };

  return (
    <>
      <button className="action-btn-edit" onClick={handleShow}>
        <FaPenToSquare />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Admin: {admin.firstname} {admin.lastname}
          </Modal.Title>
        </Modal.Header>
        <form id="edit-form" onSubmit={(e) => submitEdit(e)}>
          <Modal.Body>
            <div className="mb-1">
              <label htmlFor="firstname" className="form-label fs-6">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                value={firstnameInput}
                onChange={(e) => setFirstnameInput(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="lastname" className="form-label fs-6">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                value={lastnameInput}
                onChange={(e) => setLastnameInput(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email" className="form-label fs-6">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClose}
            >
              Save changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AdminEditModal;
