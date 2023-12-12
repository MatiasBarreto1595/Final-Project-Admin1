import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { TbBottle } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <>
      <Nav className="side-bar" style={{ backgroundColor: "#464033" }}>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/")}>
            <MdDashboard /> <span>Dashboard</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            className="linkSidebar"
            onClick={() => navigate("/categories")}
          >
            <MdCategory /> <span>Categories</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/orders")}>
            <GoListOrdered /> <span>Orders</span>
          </Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link
            className="linkSidebar"
            onClick={() => navigate("/reviews")}
          >
            Reviews
          </Nav.Link>
        </Nav.Item> */}
        <Nav.Item>
          <Nav.Link
            className="linkSidebar"
            onClick={() => navigate("/products")}
          >
            <TbBottle /> <span>Products</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/users")}>
            <FaUsers /> <span>Users</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" onClick={() => navigate("/admins")}>
            <MdAdminPanelSettings /> <span>Admins</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
