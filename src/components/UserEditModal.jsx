import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/refresSlice";

function UserEditModal({ user }) {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh);
  const myAdmin = useSelector((state) => state.admin);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [firstnameInput, setFirstnameInput] = useState(user.firstname);
  const [lastnameInput, setLastnameInput] = useState(user.lastname);
  const [emailInput, setEmailInput] = useState(user.email);
  const [addressInput, setAddressInput] = useState(user.direction);
  const [phoneInput, setPhoneInput] = useState(user.phone);

  const submitEdit = async (e) => {
    e.preventDefault();
    handleClose();
    const response = await axios({
      method: "patch",
      url: `${import.meta.env.VITE_URL_BASE_API}/buyer/${user._id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
      data: {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        email: e.target.email.value,
        direction: e.target.direction.value,
        phone: e.target.phone.value,
      },
    });
    console.log(response);
    dispatch(setRefresh(!refresh));
  };

  return (
    <>
      <button className="action-btn-edit" onClick={handleShow}>
        <FaPenToSquare />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            User: {user.firstname} {user.lastname}
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
                name="firstname"
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
                name="lastname"
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
                name="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="address" className="form-label fs-6">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="direction"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="phone" className="form-label fs-6">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
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

export default UserEditModal;
