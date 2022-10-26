import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { FoodOrderedsInterface, FoodOrderedFoodSetsInterface } from "../models/IFoodOrdered";



// const TableHead = withStyles(theme => ({
//   root: {
//     backgroundColor: 'primary'
//   }
// }))

function Food() {
  const [foodOrdereds, setFoodOrdereds] = React.useState<FoodOrderedsInterface[]>([]);

  //เเก้เป็น getfood
  //รับข้อมูลมาจาก DB
  const getfood = async () => {
    const apiUrl = `http://localhost:8080/foodordereds`;
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };

    //การกระทำ
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setFoodOrdereds(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //เพื่อให้มีการดึงข้อมูลใส่ combobox ตอนเริ่มต้นเเค่ครั้งเดียว
  //
  useEffect(() => {
    getfood();
  }, []);

  return (
    <div>
      <Container sx={{ marginTop: 2 }} maxWidth="lg">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการการสั่งอาหารว่าง
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/create"
              variant="contained"
              color="primary"
            >
              การสั่งอาหารว่าง
            </Button>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table sx={{ miinWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell align="left" width="15%" sx={{ fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell align="center" width="15%" sx={{ fontWeight: 'bold' }}>
                  Booking
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  PaymentType
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  Order Price
                </TableCell>
                <TableCell align="center" width="20%" sx={{ fontWeight: 'bold' }}>
                  Food Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foodOrdereds.map((foodOrderItem: FoodOrderedsInterface) => (
                <React.Fragment>
                  <TableRow key={foodOrderItem.ID}>
                    <TableCell align="left">{foodOrderItem.ID}</TableCell>
                    <TableCell align="left">{foodOrderItem.Booking.Room}</TableCell>
                    <TableCell align="center">{foodOrderItem.FoodPaymentType.Name}</TableCell>
                    <TableCell align="center">{foodOrderItem.TotalPrice}</TableCell>
                    <TableCell align="center">
                      {moment(foodOrderItem.FoodTime).format("DD/MM/YYYY HH:mm")}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ backgroundColor: 'text.secondary' }}>
                            <TableCell align="left">Food set name</TableCell>
                            <TableCell align="left">Quantity</TableCell>
                            <TableCell align="left">Set price</TableCell>
                            <TableCell align="left">Total price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {foodOrderItem.FoodOrderedFoodSets.map((item: FoodOrderedFoodSetsInterface) => (
                            <TableRow key={item.ID}>
                              <TableCell align="left">{item.FoodSet.Name}</TableCell>
                              <TableCell align="left">{item.Quantity}</TableCell>
                              <TableCell align="left">{item.FoodSet.Price}</TableCell>
                              <TableCell align="left">{item.Quantity * item.FoodSet.Price}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Food;
