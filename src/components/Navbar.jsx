import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarStyle from "../styles/components/NavBar.module.css";

function NavBar() {
  const onMouseEnter = () => {
    setHovered(true);
  };
  const onMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Navbar
      sticky="top"
      className={`py-0 px-5 ${NavbarStyle.bgNavbar} top-0`}
      style={{ fontFamily: "woolwich-regular" }}
    >
      <Container fluid className="d-flex">
        <Navbar.Brand href="#">
          <h1
            style={{
              color: "#3a913f",
              textShadow:
                "2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
            }}
          >
            Juice Shop
          </h1>
        </Navbar.Brand>
        <Nav.Link
          style={{
            color: "#3a913f",
            textShadow:
              "1px 0 #fff, -1px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
          }}
        >
          Admin panel
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
