import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import DeleteButton from "./DeleteButton";
import OrderEditModal from "./OrdersEditModal";

function OrdersTable() {
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

  const [orders, setOrders] = useState(null);
  const getOrders = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/order`,
    });
    setOrders(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getOrders();
  }, [refresh]);

  return (
    orders && (
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
                <TableCell>Buyer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell>
                      <div className="d-flex gap-5 align-items-center">
                        <p>{order._id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p>
                          {order.buyer.firstname} {order.buyer.lastname}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "15rem" }}>
                      <div className="d-flex align-items-center">
                        <p className="add-comma">
                          {order.items.map((item) => (
                            <span key={item.item._id}>{item.item.name}</span>
                          ))}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p>{order.state}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex flex-nowrap">
                        <OrderEditModal
                          setRefresh={setRefresh}
                          refresh={refresh}
                          order={order}
                        />
                        <DeleteButton
                          what="order"
                          id={order._id}
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  );
}

export default OrdersTable;
