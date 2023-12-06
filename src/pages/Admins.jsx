import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminsTable from "../components/AdminsTable";
import { useSelector } from "react-redux";
import NotLoguedIn from "./NotLoguedIn";

function Admins() {
  const admin = useSelector((state) => state.admin);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />

        <div className="main p-3">
          <h1>Admins</h1>
          <AdminsTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Admins;
