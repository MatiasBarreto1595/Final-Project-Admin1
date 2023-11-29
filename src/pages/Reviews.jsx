import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
function Reviews() {
  return (
    <>
      <Navbar />
      <div className="w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />
        <div className="main p-4">
          <h1>Reviews Dashboard</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Rating</th>
                <th>Content</th>
                <th>User Id</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <p>5.0</p>
                </td>
                <td>
                  Excelente atencion, la entrega fue rapida y precisa.
                  Recomendados
                </td>
                <td>12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Reviews;
