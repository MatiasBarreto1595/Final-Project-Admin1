import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function DeleteButton({ what, id, setRefresh, refresh }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const myAdmin = useSelector((state) => state.admin);

  const handleDelete = async () => {
    await axios({
      method: "delete",
      url: `${import.meta.env.VITE_URL_BASE_API}/${what}/${id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    setRefresh(!refresh);
    setShow(false);
  };

  return (
    <>
      <button className="action-btn-delete" onClick={handleShow}>
        <FaTrash />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to perform this action?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;
