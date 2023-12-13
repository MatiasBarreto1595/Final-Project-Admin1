import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../redux/refresSlice";

function OrderEditModal({ order }) {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.refresh);
  const myAdmin = useSelector((state) => state.admin);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [statusInput, setStatusInput] = useState(order.state);

  const submitEdit = async (e) => {
    e.preventDefault();
    await axios({
      method: "patch",
      url: `${import.meta.env.VITE_URL_BASE_API}/order/${order._id}`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
      data: {
        state: statusInput && e.target.status.value,
      },
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
          <Modal.Title>Order ID: {order._id}</Modal.Title>
        </Modal.Header>
        <form id="edit-form" onSubmit={(e) => submitEdit(e)}>
          <Modal.Body>
            <span>
              Buyer: {order.buyer ? order.buyer.firstname : "Buyer not found"}
              {order.buyer && order.buyer.lastname}
            </span>
            <div className="mt-4">
              <select
                className="form-select"
                onChange={(e) => setStatusInput(e.target.value)}
                name="status"
                id="status"
              >
                <option defaultValue disabled>
                  Select status
                </option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="On the way">On the way</option>
                <option value="Delivered">Delivered</option>
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

export default OrderEditModal;
