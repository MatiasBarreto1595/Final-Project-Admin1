import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/refresSlice";

function CategoriesEditModal({ category }) {
  const refresh = useSelector((state) => state.refresh);
  const dispatch = useDispatch();

  const myAdmin = useSelector((state) => state.admin);
  const formData = new FormData();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameInput, setNameInput] = useState(category.name);
  const [imageSrc, setImageSrc] = useState(
    `${import.meta.env.VITE_URL_BASE_API}/img/${category.image}`
  );

  const [imageFile, setImageFile] = useState("");

  const handleUploadImageRealTime = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    formData.append("name", nameInput);
    formData.append("image", imageFile);
    await axios({
      method: "patch",
      url: `${import.meta.env.VITE_URL_BASE_API}/category/${category._id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
      data: formData,
    });
    dispatch(setRefresh(!refresh));
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
            <div className="mb-3">
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
                style={{ position: "relative", width: "fit-content" }}
              >
                <FaPenToSquare
                  className="action-btn-edit"
                  style={{
                    position: "absolute",
                    zIndex: "1",
                    top: "45%",
                    left: "45%",
                  }}
                />
                <img
                  style={{ height: "8rem" }}
                  className="border rounded"
                  src={`${imageSrc}`}
                />
              </label>
              <input
                type="file"
                id="image-update"
                style={{ display: "none" }}
                onChange={(e) => handleUploadImageRealTime(e)}
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
