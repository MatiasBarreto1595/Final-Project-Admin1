import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPenToSquare } from "react-icons/fa6";
import { useSelector } from "react-redux";
// import useInput from "../hooks/useInput";

function CategoriesEditModal({ category, setRefresh, refresh }) {
  const myAdmin = useSelector((state) => state.admin);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameInput, setNameInput] = useState(category.name);
  const [imageSrc, setImageSrc] = useState(category.image);

  const submitEdit = async (e) => {
    e.preventDefault();
    console.log("aaaaaa");
    await axios({
      method: "patch",
      url: `${import.meta.env.VITE_URL_BASE_API}/category/${category._id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
      data: {
        name: nameInput && e.target.name.value,
        image: imageSrc && e.target.files,
      },
    });
    console.log(e.target.files);
    setRefresh(!refresh);
  };

  return (
    <>
      <button className="action-btn-edit" onClick={handleShow}>
        <FaPenToSquare />
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Category: {category.name}</Modal.Title>
        </Modal.Header>
        <form
          id="edit-form"
          onSubmit={(e) => submitEdit(e)}
          encType="multipart/form-data"
        >
          <Modal.Body>
            <div className="mb-1">
              <label htmlFor="name" className="form-label fs-6">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div className="mb-1 d-flex flex-column">
              <label
                htmlFor="image-update"
                className="form-label fs-6 edit-image"
                style={{ position: "relative", width: "100%" }}
              >
                <FaPenToSquare
                  style={{
                    position: "absolute",
                    zIndex: "10",
                    top: "3.6rem",
                    left: "13%",
                    color: "white",
                  }}
                />
                <img
                  style={{ height: "8rem" }}
                  className="border rounded"
                  src={`${
                    import.meta.env.VITE_URL_BASE_API
                  }/images/${imageSrc}`}
                  onChange={(e) => setImageSrc(e.target.value)}
                />
              </label>
              <input
                type="file"
                id="image-update"
                style={{ display: "none" }}
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

export default CategoriesEditModal;
