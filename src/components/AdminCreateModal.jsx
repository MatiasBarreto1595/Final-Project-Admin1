import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";

function AdminCreateModal({ setRefresh, refresh }) {
  const myAdmin = useSelector((state) => state.admin);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitCreate = async (e) => {
    handleClose();
    e.preventDefault();
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_URL_BASE_API}/admin/`,
      data: {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    setRefresh(!refresh);
  };

  return (
    <>
      <button className="btn btn-add me-4" onClick={handleShow}>
        <FaPlus />
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
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
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
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="password" className="form-label fs-6">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-primary">
              Save changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default AdminCreateModal;
