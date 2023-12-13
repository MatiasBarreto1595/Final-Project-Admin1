import LoginStyle from "../styles/views/Login.module.css";
import NotFoundVideo from "/videos/NotFoundVideo.mp4";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/adminSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const admin = useSelector((state) => state.admin);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[email, setEmail]= useState("");
  const[password, setPassword]= useState("");

  const adminLogIn = async (e) => {
    const response = await axios({
      method: "post",
      url: `${import.meta.env.VITE_URL_BASE_API}/tokens`,
      data: {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    });
    if (response.data.msg) {
      setWrongCredentials(true);
    } else {
      setWrongCredentials(false);
      if (response.data.role === "admin") {
        dispatch(login(response.data));
        navigate("/");
      } else {
        setWrongCredentials(true);
      }
    }
  };

  const handleAutocomplete = () => {
    setEmail("admin@admin.admin");
    setPassword("1234");
  };

  const handeSubmitLogin = (e) => {
    e.preventDefault();
    setWrongCredentials(false);
    adminLogIn(e);
  };

  useEffect(() => {
    admin && navigate("/");
  }, []);

  return (
    <>
      <video autoPlay loop muted className={LoginStyle.notFoundVideo}>
        <source src={NotFoundVideo} type="video/mp4" />
      </video>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className={LoginStyle.title}>Juice Shop</h1>
        <div className={LoginStyle.register}>
          <h2 className="text-light">Welcome Admin</h2>
          <form
            className="d-flex flex-column gap-3 mt-3 w-100"
            onSubmit={(e) => handeSubmitLogin(e)}
          >
            <div className="d-flex flex-column gap-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                required
                autoComplete="on"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                required
                autoComplete="on"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
            {wrongCredentials && (
              <small className="text-danger fs-6">
                Wrong email or password
              </small>
            )}
             <button type="button" onClick={handleAutocomplete} className={LoginStyle.registerBtn}>
              <span>Autocomplete</span>
            </button>
            <button type="submit" className={LoginStyle.registerBtn}>
              <span>Log in</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
