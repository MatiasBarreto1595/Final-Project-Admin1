import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Card } from "react-bootstrap";
function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="row w-100 g-0">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10 p-4 ">
          <h1 className="m-3">Dashboard</h1>
          <div className="d-flex">
            <div className="m-3">
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Ingresos del Mes</Card.Title>
                  <hr />
                  <Card.Subtitle className="mb-2 text-muted">
                    Ingresos
                  </Card.Subtitle>
                  <Card.Text>USD 150</Card.Text>
                  <button className="btn btn-success">Ver todos</button>
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
                  <Card.Text>1</Card.Text>
                  <button className="btn btn-success">Ver todos</button>
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
                  <Card.Text>24</Card.Text>
                  <button className="btn btn-success">Ver todos</button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
