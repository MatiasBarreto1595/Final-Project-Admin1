import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
function Orders() {
  return (
    <>
      <Navbar />
      <div className="w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />
        <div className="main p-4">
          <h1>Orders Dashboard</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID User</th>
                <th>Products</th>
                <th>Total Price</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <p>12</p>
                </td>
                <td>Orange juice</td>
                <td>150</td>
                <td>Pending...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Orders;
