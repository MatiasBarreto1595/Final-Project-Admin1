import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "ldrs/ring";

function Dashboard() {
  const navigate = useNavigate();
  const myAdmin = useSelector((state) => state.admin);

  useEffect(() => {
    !myAdmin && navigate("/login");
    getOrders();
    getUsers();
    getProducts();
    getAdmins();
  }, []);

  const [valueOrders, setValueOrders] = useState(0);
  const getOrders = async () => {
    let totalValueOrders = 0;
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/order`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    response.data.forEach((order) => {
      totalValueOrders += order.totalValue;
    });
    setValueOrders(totalValueOrders);
  };

  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/buyer`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    setUsers(response.data);
  };

  const [products, setProducts] = useState(null);
  const getProducts = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/product`,
    });
    setProducts(response.data);
  };

  const [admins, setAdmins] = useState(null);
  const getAdmins = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/admin`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    setAdmins(response.data);
  };

  return (
    myAdmin && (
      <>
        <Navbar />
        <div className="w-100 g-0 back-dashboard">
          <Sidebar />
          <div className="main p-3">
            <h1 className="title-dashboard">Dashboard</h1>
            <div className="d-flex flex-wrap">
              <div className="m-3">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Ingresos totales</Card.Title>
                    <hr />
                    <Card.Subtitle className="mb-2 text-muted">
                      Ingresos
                    </Card.Subtitle>
                    <Card.Text>
                      USD{" "}
                      {valueOrders !== 0 ? (
                        valueOrders
                      ) : (
                        <l-ring
                          size="28"
                          stroke="3"
                          bg-opacity="0"
                          speed="2"
                          color="#3a913f"
                        ></l-ring>
                      )}
                    </Card.Text>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#3a913f", color: "white" }}
                      onClick={() => navigate("/orders")}
                    >
                      Ver todos
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div className="m-3">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Cantidad de Usuarios</Card.Title>
                    <hr />
                    <Card.Subtitle className="mb-2 text-muted">
                      Usuarios
                    </Card.Subtitle>
                    <Card.Text>
                      {users ? (
                        users.length
                      ) : (
                        <l-ring
                          size="28"
                          stroke="3"
                          bg-opacity="0"
                          speed="2"
                          color="#3a913f"
                        ></l-ring>
                      )}
                    </Card.Text>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#3a913f", color: "white" }}
                      onClick={() => navigate("/users")}
                    >
                      Ver todos
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div className="m-3">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Cantidad de Productos</Card.Title>
                    <hr />
                    <Card.Subtitle className="mb-2 text-muted">
                      Productos
                    </Card.Subtitle>
                    <Card.Text>
                      {products ? (
                        products.length
                      ) : (
                        <l-ring
                          size="28"
                          stroke="3"
                          bg-opacity="0"
                          speed="2"
                          color="#3a913f"
                        ></l-ring>
                      )}
                    </Card.Text>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#3a913f", color: "white" }}
                      onClick={() => navigate("/products")}
                    >
                      Ver todos
                    </button>
                  </Card.Body>
                </Card>
              </div>
              <div className="m-3">
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>Cantidad de Admins</Card.Title>
                    <hr />
                    <Card.Subtitle className="mb-2 text-muted">
                      Admin
                    </Card.Subtitle>
                    <Card.Text>
                      {admins ? (
                        admins.length
                      ) : (
                        <l-ring
                          size="28"
                          stroke="3"
                          bg-opacity="0"
                          speed="2"
                          color="#3a913f"
                        ></l-ring>
                      )}
                    </Card.Text>
                    <button
                      className="btn"
                      style={{ backgroundColor: "#3a913f", color: "white" }}
                      onClick={() => navigate("/admins")}
                    >
                      Ver todos
                    </button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Dashboard;
