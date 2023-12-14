import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/refresSlice";

function ProductEditModal({ product }) {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh);
  const myAdmin = useSelector((state) => state.admin);

  const originalImages = product.image;

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

  const handleUploadImageRealTime = (event, index) => {
    if (event.target.files && event.target.files[0]) {
      document.getElementById(`img_${index}`).src = URL.createObjectURL(
        event.target.files[0]
      );
    }
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

  const submitEdit = async (e) => {
    e.preventDefault();
    handleClose();
    const formData = new FormData(e.target);
    await axios({
      method: "patch",
      url: `${import.meta.env.VITE_URL_BASE_API}/product/${product._id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
        "Content-Type": "multipart/form-data",
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
          <Modal.Title>Product: {product.name}</Modal.Title>
        </Modal.Header>
        <form
          id="edit-form"
          onSubmit={(e) => submitEdit(e)}
          encType="multipart/form-data"
        >
          <Modal.Body
            style={{
              maxHeight: "calc(100vh - 210px)",
              overflowY: "auto",
            }}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label fs-6">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label fs-6">
                Description:
              </label>
              <textarea
                name="description"
                type="text"
                className="form-control"
                id="description"
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label fs-6">
                Ingredients:
              </label>
              <input
                name="ingredients"
                type="text"
                className="form-control"
                id="ingredients"
                value={ingredientsInput}
                onChange={(e) => setIngredientsInput(e.target.value)}
              />
            </div>
            <div className="mb-1 d-flex flex-row flex-nowrap gap-2">
              {originalImages.map((img, index) => (
                <div key={`${img}_${index}`}>
                  <label
                    htmlFor={`image-update_${index}`}
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
                      src={
                        img.includes("http")
                          ? `${img}`
                          : `${import.meta.env.VITE_URL_SUPABASE_IMG}/${img}`
                      }
                      id={`img_${index}`}
                    />
                  </label>
                  <input
                    name={`img_${index}`}
                    type="file"
                    id={`image-update_${index}`}
                    style={{ display: "none" }}
                    onChange={(e) => handleUploadImageRealTime(e, index)}
                  />
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label fs-6">
                Price:
              </label>
              <input
                name="price"
                type="text"
                className="form-control"
                id="price"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label fs-6">
                Stock:
              </label>
              <input
                name="stock"
                type="text"
                className="form-control"
                id="stock"
                value={stockInput}
                onChange={(e) => setStockInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label fs-6">
                Categories:
              </label>
              <select
                className="form-select"
                onChange={(e) => setCategoryInput(e.target.value)}
                name="category"
                id="category"
                value={categoryInput}
              >
                {allCategories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="bestSeller" className="form-label fs-6">
                Best seller:
              </label>
              <select
                className="form-select"
                onChange={(e) => setBestSellerInput(e.target.value)}
                name="bestSeller"
                id="bestSeller"
              >
                <option value={eval(bestSellerInput)}>{bestSellerInput}</option>
                <option value={!eval(bestSellerInput)}>
                  {`${!eval(bestSellerInput)}`}
                </option>
              </select>
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

export default ProductEditModal;
