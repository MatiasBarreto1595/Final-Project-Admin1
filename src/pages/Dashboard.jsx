import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import NotLoguedIn from "./NotLoguedIn";

function Dashboard() {
  const admin = useSelector((state) => state.admin);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />
        <div className="main p-3">
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
  ) : (
    <NotLoguedIn />
  );
}

export default Dashboard;
