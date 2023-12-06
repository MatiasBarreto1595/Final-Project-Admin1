import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

export default function CategoriesTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [categories, setCategories] = React.useState(null);
  const getCategories = async () => {
    const response = await axios({
      method: "get",
      url: `${import.meta.env.VITE_URL_BASE_API}/category`,
    });
    setCategories(response.data);
    console.log(categories);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    categories && (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 750 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead
              style={{
                position: "sticky",
                top: 0,
                boxShadow: "0 4px 2px -2px gray",
              }}
            >
              <TableRow className="tables-headers">
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Products</TableCell>
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => (
                  <TableRow
                    key={category._id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <p>{category._id}</p>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div className="d-flex align-items-center">
                        <p>{category.name}</p>
                      </div>
                    </TableCell>
                    <TableCell sx={{ maxWidth: "15rem" }}>
                      <div className="d-flex align-items-center">
                        <p className="add-comma">
                          {category.products.map((product) => (
                            <span key={product._id}>{product.name}</span>
                          ))}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        <img
                          style={{ height: "5rem" }}
                          src={`${import.meta.env.VITE_URL_BASE_API}/images/${
                            category.image
                          }`}
                          alt=""
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
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  );
}
