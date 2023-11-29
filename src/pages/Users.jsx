import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Users() {
  return (
    <>
      <Navbar />
      <div className="w-100 g-0" style={{ backgroundColor: "#f2e8cf" }}>
        <Sidebar />
        <div className="main p-4">
          <h1>Users Dashboard</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Adress</th>
                <th>Contact</th>
                <th>Avatar</th>
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
                <td>Bvar White House 01 Washington</td>
                <td>+1 111223445</td>
                <td>
                  <img
                    className="joe"
                    src="https://www.shutterstock.com/image-vector/kyiv-ukraine-nov-08-2020-260nw-1850087464.jpg"
                    alt="joe biden"
                  />
                </td>

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

export default Users;
