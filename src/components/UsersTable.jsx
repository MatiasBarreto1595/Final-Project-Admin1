import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import DeleteButton from "./DeleteButton";
import UserEditModal from "./UserEditModal";
import "ldrs/ring";

function UsersTable() {
  const refresh = useSelector((state) => state.refresh);
  const myAdmin = useSelector((state) => state.admin);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [users, setUsers] = useState(null);
  const getUsers = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/buyer`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, [refresh]);

  return users ? (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "67vh" }}>
        <Table aria-label="sticky table">
          <TableHead
            style={{
              position: "sticky",
              top: 0,
              boxShadow: "0 4px 2px -2px gray",
              backgroundColor: "white",
            }}
          >
            <TableRow className="tables-headers">
              <TableCell>ID</TableCell>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user._id} hover role="checkbox" tabIndex={-1}>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <p>{user._id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <p>{user.firstname}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <p>{user.lastname}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {user.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {user.direction}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {user.phone}
                    </div>
                  </TableCell>
                  <TableCell className="add-comma">
                    <div className="d-flex align-items-center">
                      {user.orders.map((order) => (
                        <span key={order._id}>{order._id}</span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex flex-nowrap">
                      <UserEditModal user={user} />
                      <DeleteButton what="buyer" id={user._id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  ) : (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <l-ring
        size="80"
        stroke="3"
        bg-opacity="0"
        speed="2"
        color="white"
      ></l-ring>
    </div>
  );
}

export default UsersTable;
