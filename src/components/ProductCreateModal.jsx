import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { FaPlus } from "react-icons/fa6";
import { setRefresh } from "../redux/refresSlice";

function ProductCreateModal() {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh);

  const myAdmin = useSelector((state) => state.admin);
  const formData = new FormData();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const name = useInput("");
  const description = useInput("");
  const ingredients = useInput("");
  const price = useInput("");
  const stock = useInput("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/category`,
    });
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const submitCreate = async (e) => {
    e.preventDefault();
    formData.append("name", name.value);
    formData.append("description", description.value);
    formData.append("ingredients", ingredients.value);
    formData.append("price", price.value);
    formData.append("stock", stock.value);
    formData.append("image", image);
    formData.append("category", category);
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_URL_BASE_API}/product/`,
      data: formData,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    dispatch(setRefresh(!refresh));
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
              <label htmlFor="description" className="form-label fs-6">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                {...description}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="ingredients" className="form-label fs-6">
                Ingredients
              </label>
              <input
                type="text"
                className="form-control"
                id="ingredients"
                {...ingredients}
              />
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

            <div className="mb-1">
              <label htmlFor="price" className="form-label fs-6">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                {...price}
              />
            </div>

            <div className="mb-1">
              <label htmlFor="stock" className="form-label fs-6">
                Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                {...stock}
              />
            </div>
            <div className="mb-1">
              <label htmlFor="category" className="form-label fs-6">
                Category
              </label>
              <select
                name="category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
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

export default ProductCreateModal;
