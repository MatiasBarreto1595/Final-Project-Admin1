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
import AdminEditModal from "./AdminEditModal";

function AdminsTable() {
  const myAdmin = useSelector((state) => state.admin);
  const [refresh, setRefresh] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [admins, setAdmins] = useState(null);
  const getAdmins = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/admin`,
      headers: {
        Authorization: `Bearer ${myAdmin.token}`,
      },
    });
    setAdmins(response.data);
  };

  useEffect(() => {
    getAdmins();
  }, [refresh]);

  return (
    admins && (
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((admin) => (
                  <TableRow key={admin._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p>{admin._id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p>{admin.firstname}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p>{admin.lastname}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        {admin.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex flex-column align-items-start ps-4 gap-1">
                        <AdminEditModal
                          setRefresh={setRefresh}
                          refresh={refresh}
                          admin={admin}
                        />
                        <DeleteButton
                          what="admin"
                          id={admin._id}
                          setRefresh={setRefresh}
                          refresh={refresh}
                        />
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
          count={admins.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  );
}

export default AdminsTable;
