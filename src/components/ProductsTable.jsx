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
import ProductEditModal from "./ProductEditModal";
import "ldrs/ring";
import { useSelector } from "react-redux";

function ProductsTable() {
  const refresh = useSelector((state) => state.refresh);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [products, setProducts] = useState(null);
  const getProducts = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/product`,
    });
    setProducts(response.data);
  };

  useEffect(() => {
    getProducts();
  }, [refresh]);

  return products ? (
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
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Ingredients</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Best seller</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product._id} hover role="checkbox">
                  <TableCell>
                    <div className="d-flex gap-5 align-items-center">
                      <p>{product._id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <p>{product.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      <p>{`${product.description.substring(0, 100)}...`}</p>
                    </div>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "40rem" }}>
                    <div className="d-flex align-items-center">
                      <p>{product.ingredients}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {product.image.map((img, index) => (
                        <img
                          key={`${img}_${index}`}
                          style={{ height: "5rem" }}
                          src={
                            img.includes("http")
                              ? `${img}`
                              : `${
                                  import.meta.env.VITE_URL_SUPABASE_IMG
                                }/${img}`
                          }
                          alt=""
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {product.price}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {product.stock}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {product.category
                        ? product.category.name
                        : "Uncategorized product"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {`${product.bestSeller}`}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {product.slug}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="d-flex flex-nowrap">
                      <ProductEditModal product={product} />
                      <DeleteButton what="product" id={product._id} />
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
        count={products.length}
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

export default ProductsTable;
