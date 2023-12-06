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
      <div className="w-100 g-0 back-dashboard">
        <Sidebar />
        <div className="main p-3">
          <h1 className="title-dashboard">Orders</h1>
          <OrdersTable />
        </div>
      </div>
    </>
  ) : (
    <NotLoguedIn />
  );
}

export default Orders;
