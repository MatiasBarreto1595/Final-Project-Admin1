import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Products() {
  return (
    <>
      <Navbar />
      <div className="w-100 g-1" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />
        <div className="main p-4">
          <h1>Products Dashboard</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image 1st</th>
                <th>Image 2nd</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <p>Orange Juice</p>
                </td>
                <td style={{maxWidth: "20rem"}}>
                  Pure juice made with natural oranges from the northern and
                  warm region of Uruguay.
                </td>
                <td>$3.5</td>
                <td></td>
                <td></td>
                <td>50</td>
                <td>5.0</td>
                <td>Juices</td>
                <td>
                  <a
                    className="btn btn-primary"
                    href="/articulos/editar/<%= article.id %>"
                  >
                    Editar
                  </a>

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

export default Products;
