import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AdminsTable from "../components/AdminsTable";
import { useSelector } from "react-redux";
import { useState } from "react";
import NotLoguedIn from "./NotLoguedIn";
import AdminCreateModal from "../components/AdminCreateModal";

function Admins() {
  const admin = useSelector((state) => state.admin);
  const [refresh, setRefresh] = useState(false);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-0 back-dashboard">
        <Sidebar />
        <div className="main p-3">
          <h1 className="title-dashboard">Admins</h1>
          <AdminCreateModal refresh={refresh} setRefresh={setRefresh} />
          <AdminsTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Admins;
