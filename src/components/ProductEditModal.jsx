import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPenToSquare } from "react-icons/fa6";
import { useSelector } from "react-redux";

function ProductEditModal({ product, setRefresh, refresh }) {
  const myAdmin = useSelector((state) => state.admin);

  const [allCategories, setAllCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/category`,
    });
    setAllCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imageSrc, setImageSrc] = useState(
    `${import.meta.env.VITE_URL_BASE_API}/images/${product.imagem}`
  );

  const [imageFile, setImageFile] = useState("");

  const handleUploadImageRealTime = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setImageSrc(URL.createObjectURL(event.target.files[0]));
    }
    console.log(imageSrc.substring(22, imageSrc.length));
  };

  const [nameInput, setNameInput] = useState(product.name);
  const [descriptionInput, setDescriptionInput] = useState(product.description);
  const [ingredientsInput, setIngredientsInput] = useState(product.ingredients);
  const [priceInput, setPriceInput] = useState(product.price);
  const [stockInput, setStockInput] = useState(product.stock);
  const [categoryInput, setCategoryInput] = useState(product.category.name);
  const [bestSellerInput, setBestSellerInput] = useState(
    `${product.bestSeller}`
  );
  const [slugInput, setSlugInput] = useState(product.slug);

  const submitEdit = async (e) => {
    e.preventDefault();
    await axios({
      method: "patch",
      url: `${import.meta.env.VITE_URL_BASE_API}/product/${product._id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
      data: {
        state: statusInput && e.target.status.value,
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
          <Modal.Title>Product: {product.name}</Modal.Title>
        </Modal.Header>
        <form id="edit-form" onSubmit={(e) => submitEdit(e)}>
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
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-6">
                Description:
              </label>
              <textarea
                type="text"
                className="form-control"
                id="name"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-6">
                Ingredients:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
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
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-6">
                Price:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-6">
                Stock:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={stockInput}
                onChange={(e) => setStockInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categories" className="form-label fs-6">
                Categories:
              </label>
              <select
                className="form-select"
                onChange={(e) => setCategoryInput(e.target.value)}
                name="category"
                id="categories"
              >
                {allCategories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-6">
                Best seller:
              </label>
              <select
                className="form-select"
                onChange={(e) => setBestSellerInput(e.target.value)}
                name="category"
                id="categories"
              >
                <option value={!eval(bestSellerInput)}>
                  {`${!eval(bestSellerInput)}`}
                </option>
                <option value={eval(bestSellerInput)}>{bestSellerInput}</option>
              </select>
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

export default ProductEditModal;
