import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { FaPlus } from "react-icons/fa6";

function CategoryCreateModal({ setRefresh, refresh }) {
  const myAdmin = useSelector((state) => state.admin);
  const formData = new FormData();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const name = useInput("");
  const [image, setImage] = useState("");

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    formData.append("name", name.value);
    formData.append("image", image);
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_URL_BASE_API}/category/`,
      data: formData,
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
          <Modal.Title>Create category</Modal.Title>
        </Modal.Header>
        <form
          id="create-form"
          onSubmit={(e) => submitCreate(e)}
          encType="multipart/form-data"
        >
          <Modal.Body>
            <div className="mb-1">
              <label htmlFor="name" className="form-label fs-6">
                Name
              </label>
              <input type="text" className="form-control" id="name" {...name} />
            </div>
            <div className="mb-1">
              <label htmlFor="image" className="form-label fs-6">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleFileChange}
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

export default CategoryCreateModal;
