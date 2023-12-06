import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductsTable from "../components/ProductsTable";
import { useSelector } from "react-redux";
import NotLoguedIn from "./NotLoguedIn";

function Products() {
  const admin = useSelector((state) => state.admin);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-1" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />
        <div className="main p-3">
          <ProductsTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Products;
