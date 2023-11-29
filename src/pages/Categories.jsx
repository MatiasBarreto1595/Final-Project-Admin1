import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Categories() {
  return (
    <>
      <Navbar />
      <div className="row w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10 p-4">
          <h1>Users Dashboard</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <p>Juices</p>
                </td>
                <td>
                  <img
                    className="joe"
                    src="https://juiceshop.com/cdn/shop/files/Juice-2_1000x.png?v=1674444624"
                    alt="jucy juice"
                  />
                </td>

                <td>
                  <a
                    className="btn btn-primary"
                    href="/articulos/editar/<%= article.id %>"
                  >
                    Edit
                  </a>

                  <form
                    action="/articulos/<%= article.id %>?_method=DELETE"
                    method="post"
                  >
                    <button className="btn btn-danger">Delete</button>
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

export default Categories;
