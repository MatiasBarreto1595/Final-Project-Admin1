import React from "react";
import { Nav } from "react-bootstrap";

function Sidebar() {
  return (
    <>
      <Nav
        className="side-bar"
        style={{ backgroundColor: "#3a913f" }}
      >
        <Nav.Item>
          <Nav.Link className="linkSidebar" href="/dashboard">
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" href="/categories">
            Categories
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" href="/orders">
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" href="/reviews">
            Reviews
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" href="/products">
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" href="/users">
            Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="linkSidebar" href="/admins">
            Admins
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default Sidebar;
