import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import OrdersTable from "../components/OrdersTable";
import { useSelector } from "react-redux";
import NotLoguedIn from "./NotLoguedIn";

function Orders() {
  const admin = useSelector((state) => state.admin);

  return admin ? (
    <>
      <Navbar />
      <div className="w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />
        <div className="main p-3">
          <OrdersTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Orders;
