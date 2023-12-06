import NotLoguedVideo from "/videos/NotFoundVideo.mp4";
import NotLoguedStyle from "../styles/views/NotLoguedIn.module.css";
import LoginStyle from "../styles/views/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

function NotLoguedIn() {
  const navigate = useNavigate();
  return (
    <>
      <Link to="/login" className={LoginStyle.backArrow}>
        <HiArrowLeft stroke="#fff" strokeWidth="1px" fill="none" size="30px" />
      </Link>
      <video autoPlay loop muted className={NotLoguedStyle.notFoundVideo}>
        <source src={NotLoguedVideo} type="video/mp4" />
      </video>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 gap-5">
        <div
          className={`${NotLoguedStyle.backText} d-flex justify-content-center align-items-center gap-2`}
        >
          <span className={NotLoguedStyle.ooops}>Ooops!</span>
          <span className={NotLoguedStyle.messageNotFound}>
            You are not logged in
          </span>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className={NotLoguedStyle.backBtn}
            onClick={() => {
              navigate("/login");
            }}
          >
            <span>Go login</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default NotLoguedIn;
