import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Admins() {
  return (
    <>
      <Navbar />
      <div className="row w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10 p-4">
          <h1>Admins </h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <p>Joe</p>
                </td>
                <td>Biden</td>
                <td>president@gmail.com</td>
                <td>
                  <form
                    action="/articulos/<%= article.id %>?_method=DELETE"
                    method="post"
                  >
                    <button className="btn btn-danger">Eliminar</button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admins;
