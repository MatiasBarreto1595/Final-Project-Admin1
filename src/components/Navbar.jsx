import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarStyle from "../styles/components/Navbar.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/adminSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar
      sticky="top"
      className={`py-0 px-5 ${NavbarStyle.bgNavbar} top-0`}
      style={{ fontFamily: "woolwich-regular", height: "4rem" }}
    >
      <Container fluid className="d-flex">
        <Navbar.Brand href="https://juiceshop-ha.vercel.app/">
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
        <Nav.Link
          onClick={handleLogout}
          style={{
            color: "#3a913f",
            textShadow:
              "1px 0 #fff, -1px 0 #fff, 0 2px #fff, 0 -2px #fff, 1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff",
          }}
        >
          Logout
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default NavBar;
