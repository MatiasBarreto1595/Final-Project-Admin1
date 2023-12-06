import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UsersTable from "../components/UsersTable";
import NotLoguedIn from "./NotLoguedIn";

function Users() {
  const admin = useSelector((state) => state.admin);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-0 back-dashboard">
        <Sidebar />
        <div className="main p-3">
          <h1 className="title-dashboard">Users</h1>
          <UsersTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Users;
