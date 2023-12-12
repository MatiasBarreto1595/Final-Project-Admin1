import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CategoriesTable from "../components/CategoriesTable";
import { useSelector } from "react-redux";
import NotLoguedIn from "./NotLoguedIn";
import CategoryCreateModal from "../components/CategoryCreateModal";
import { useState } from "react";

function Categories() {
  const admin = useSelector((state) => state.admin);
  const [refresh, setRefresh] = useState(false);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-0 back-dashboard">
        <Sidebar />
        <div className="main p-3">
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <h1 className="title-dashboard">Categories</h1>
            <CategoryCreateModal refresh={refresh} setRefresh={setRefresh} />
          </div>
          <CategoriesTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Categories;
