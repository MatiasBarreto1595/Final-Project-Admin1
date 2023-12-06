import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <>
      <Nav className="side-bar" style={{ backgroundColor: "#464033" }}>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/")}>
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="linkSidebar"
            onClick={() => navigate("/categories")}
          >
            Categories
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/orders")}>
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="linkSidebar"
            onClick={() => navigate("/reviews")}
          >
            Reviews
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="linkSidebar"
            onClick={() => navigate("/products")}
          >
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/users")}>
            Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/admins")}>
            Admins
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
