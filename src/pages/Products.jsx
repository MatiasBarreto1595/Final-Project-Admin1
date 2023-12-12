import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductsTable from "../components/ProductsTable";
import { useSelector } from "react-redux";
import { useState } from "react";
import NotLoguedIn from "./NotLoguedIn";
import ProductCreateModal from "../components/ProductCreateModal";

function Products() {
  const [refresh, setRefresh] = useState(false);
  const admin = useSelector((state) => state.admin);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-1 back-dashboard">
        <Sidebar />
        <div className="main p-3">
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <h1 className="title-dashboard">Products</h1>
            <ProductCreateModal refresh={refresh} setRefresh={setRefresh} />
          </div>
          <ProductsTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Products;
