import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";

function AdminCreateModal({ setRefresh, refresh }) {
  const myAdmin = useSelector((state) => state.admin);
  const formData = new FormData();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const password = useInput("");

  const submitCreate = async (e) => {
    console.log(firstname.value,lastname.value,email.value,password.value);
    e.preventDefault();
    formData.append("firstname", firstname.value);
    formData.append("lastname", lastname.value);
    formData.append("email", email.value);
    formData.append("password", password.value);
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_URL_BASE_API}/admin/`,
      data: formData,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    setRefresh(!refresh);
  };

  return (
    <>
      <button className="btn btn-success" onClick={handleShow}>
        Create admin
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create admin</Modal.Title>
        </Modal.Header>
        <form id="create-form" onSubmit={(e) => submitCreate(e)}>
          <Modal.Body>
            <div className="mb-1">
              <label htmlFor="firstname" className="form-label fs-6">
                Firstname
              </label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                {...firstname}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="lastname" className="form-label fs-6">
                Lastname
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                {...lastname}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email" className="form-label fs-6">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                {...email}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label fs-6">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                {...password}
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

export default AdminCreateModal;
