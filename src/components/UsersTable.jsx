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

function UsersTable() {
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTZlNTc4ZGM2ZDIxOThjZDJhNjA0M2QiLCJpYXQiOjE3MDE4NzQ5MDJ9.bCUS3aDtMgDkfaBvNBxRUULae0OH7U7JuXbp0qLKmt0`,
      },
    });
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    users && (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "67vh" }}>
          <Table aria-label="sticky table">
            <TableHead
              style={{
                position: "sticky",
                top: 0,
                boxShadow: "0 4px 2px -2px gray",
              }}
            >
              <TableRow className="tables-headers">
                <TableCell>ID</TableCell>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Direction</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Orders</TableCell>
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
    )
  );
}

export default UsersTable;
