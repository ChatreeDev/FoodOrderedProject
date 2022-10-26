import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, MenuItem } from '@mui/material';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { BookingsInterface } from "../models/IBooking";
import { FoodPaymentTypesInterface } from "../models/IFoodPaymentType";
import { FoodSetsInterface } from "../models/IFoodSet";
import { FoodOrderedFoodSetsInterface, FoodOrderedsInterface } from "../models/IFoodOrdered";



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/* UI ของระบบการสั่งอาหารว่าง
    ตัวแปรสำหรับรับค่า Interface Ex. const [bookings, setBookings] = React.useState<BookingsInterface[]>([]);
    เป็น array เพราะเป็นข้อมูลหลายตัว 
    ([]); => ตัวนี้หมายถึงค่าเริ่มต้นของตัวแปร (เรากำหนดให้เป็น array ว่างเปล่าไปก่อน)
    ###################################################################################################
    ใช้คำว่า export นำหน้าเพราะว่าเราจะเอาไปใช้ในไฟล์อื่นต่อ (ไฟล์ App.tsx)
    ส่วน default หมายความว่าเราสามารถเอาชื่อฟังก์ชันนี้ไปใช้ได้เลย (หมายถึงจะได้รู้ว่าฟังก์ชันนี้ ตัว default มันอยู่หน้าไหนอะ)
*/

export default function FoodOrderedCreate() {
  //Set Function
  // const [bookings, setBookings] = React.useState<BookingsInterface[]>([]);
  const [booking, setBooking] = React.useState<BookingsInterface>();
  const [foodPaymenyTypes, setFoodPaymentTypes] = React.useState<FoodPaymentTypesInterface[]>([]);
  const [foodSets, setFoodSets] = React.useState<FoodSetsInterface[]>([]);
  const [selectedFoodSet, setSelectedFoodSet] = React.useState<FoodSetsInterface | null>();
  const [selectedBooking, setSelectedBooking] = React.useState<BookingsInterface[]>([]);
  const [foodOrdered, setFoodOrdered] = React.useState<Partial<FoodOrderedsInterface>>({
    BookingID: 1, FoodPaymentTypeID: 0, FoodOrderedFoodSets: [], FoodTime: new Date(),  TotalPrice: 0          // แก้ตอนรวม
  });

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  //Get Function
  const getBookings = async () => {
    const apiUrl = "http://localhost:8080/booking/1";       //Port Backend (path get bookings) ***แก้ตอนรวมไฟล์
    const requestOptions = {
      method: "GET",                                       //วิธีการที่ทำ
      headers: {
        "Content-Type": "application/json",                //ติดต่อสื่อสารกันโดยใช้ json (ถ้าไม่ใช้ json ก็อาจจจะเป็น HTML, Text, Pics ไรงี้)
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch(apiUrl, requestOptions)                          //เรียกใช้ฟังก์ชัน fetch ในการดึงข้อมูล (input เป็น apiUrl,RequestInfo เป็น requestOptions)
      .then(response => response.json())                   //พอหลังบ้าน respon กลับมาเราก็จะทำการ then ข้อมูลที่ได้จากหลังบ้าน โดยเริ่มจากการแปลงข้อมูลให้เป็น json 
      .then(res => {
        console.log(res);                                  //console log ดูว่าข้อมูลที่ได้จากหลังบ้านเป็นหน้าตายังไง
        if (res.data) {                                    //มันติดต่อกันผ่าน path /bookins ใช่ป้ะ มันก็เลยจะวิ่งไปที่ controller booking (List)ใน Backend อะ
          setBooking(res.data);                           //โดยตัว respone ที่เราได้จาก backend มันก็จะมี data กับ error ซึ่งถ้ามันมี data ส่งมาอะมันก็จะ
        } else {                                           //มันก็จะเอาค่าไปเก็บไว้ใน setBookings (Set function ที่เรากำหนดไว้ก่อนหน้านี้อะ)
          console.log(res.error);
        }
      })
  }

  const getFoodSets = async () => {                       //Get ตามหน้า UI อะ ไล่ไปเรื่อย
    const apiUrl = "http://localhost:8080/foodsets";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setFoodSets(res.data);
        } else {
          console.log(res.error);
        }
      })
  }

  const getFoodPaymentTypes = async () => {
    const apiUrl = "http://localhost:8080/foodpayment_types";
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setFoodPaymentTypes(res.data);
        } else {
          console.log(res.error);
        }
      })
  }

  const submit = () => {

    if (foodOrdered.FoodOrderedFoodSets?.length === 0) {
      setError(true);
      return;
    }
    console.log(foodOrdered);

    // return
    const apiUrl = "http://localhost:8080/foodordereds";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(foodOrdered)
    }

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.data) {
          setSuccess(true)
        } else {
          setError(true);
          console.log(res.error)
        }
      })
  }

  const addToOrder = () => {
    if (!selectedFoodSet) {
      return;
    }
    let newFoodSet: Partial<FoodOrderedFoodSetsInterface> = {
      FoodSetID: selectedFoodSet.ID,
      Quantity: 1
    }
    let newOrdered = { ...foodOrdered };
    let newPrice = (foodOrdered.TotalPrice ?? 0) + (selectedFoodSet.Price ?? 0);
    newOrdered.FoodOrderedFoodSets?.push(newFoodSet as FoodOrderedFoodSetsInterface);
    setFoodOrdered({ ...newOrdered, TotalPrice: newPrice });
  }

  const addQuantity = (index: number) => {
    let newFoodOrderedFoodSets = foodOrdered.FoodOrderedFoodSets;

    if (newFoodOrderedFoodSets === undefined) {
      return;
    }

    let foodSetID = newFoodOrderedFoodSets[index].FoodSetID;
    let newTotalPrice = (foodOrdered.TotalPrice ?? 0) + (foodSets.find(f => f.ID === foodSetID)?.Price ?? 0);
    newFoodOrderedFoodSets[index].Quantity++;
    setFoodOrdered({ ...foodOrdered, FoodOrderedFoodSets: newFoodOrderedFoodSets, TotalPrice: newTotalPrice });
  }

  const reduceQuantity = (index: number) => {
    let newFoodOrderedFoodSets = foodOrdered.FoodOrderedFoodSets;

    if (newFoodOrderedFoodSets === undefined) {
      return;
    }

    if (newFoodOrderedFoodSets[index].Quantity === 1) {
      return;
    }

    let foodSetID = newFoodOrderedFoodSets[index].FoodSetID;
    let newTotalPrice = (foodOrdered.TotalPrice ?? 0) - (foodSets.find(f => f.ID === foodSetID)?.Price ?? 0);
    newFoodOrderedFoodSets[index].Quantity--;
    setFoodOrdered({ ...foodOrdered, FoodOrderedFoodSets: newFoodOrderedFoodSets, TotalPrice: newTotalPrice });
  }

  const removeFoodSetFromOrdered = (index: number) => {
    let currentFoodOrderedFoodSets = foodOrdered.FoodOrderedFoodSets;

    if (currentFoodOrderedFoodSets === undefined) {
      return;
    }

    let foodSetID = currentFoodOrderedFoodSets[index].FoodSetID;
    let newTotalPrice = (foodOrdered.TotalPrice ?? 0) - ((foodSets.find(f => f.ID === foodSetID)?.Price ?? 0) * currentFoodOrderedFoodSets[index].Quantity);
    let newFoodOrderedFoodSets = currentFoodOrderedFoodSets.filter((_, i) => i !== index);
    setFoodOrdered({ ...foodOrdered, FoodOrderedFoodSets: newFoodOrderedFoodSets, TotalPrice: newTotalPrice });
  }

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    const name = event.target.name;
    setFoodOrdered({...foodOrdered, [name]: event.target.value});
  }

  /* useEffect มี 2 Parameter 
      1. () => {} เป็นการดึงฟังก์ชัน Get ที่เราต้องใช้มาใช้
      2. [] Array ว่างเปล่าตัวนี้หมายความ มันจะเป็นการเรียกใช้ useEffect แค่ครั้งเดียว ก็คือดึงข้อมูลแต่ละตัวมาแค่ครั้งเดียว 
      (หมายถึงดึงมาเฉพาะตอนเปิดหน้า Create)
  */

  useEffect(() => {
    getBookings();
    getFoodSets();
    getFoodPaymentTypes();
    // if(foodOrdered.BookingID == 0) return;
    // setSelectedBooking(bookings.find(b => b.ID === foodOrdered.BookingID))
  }, []);

  // console.log(foodOrdered);
  console.log(selectedFoodSet);

  /* ส่วนของ AutoComplete (กรุณาใส่ตัว set ตรง Option ให้ตรง)
      Ex. const [foodSets, setFoodSets] = React.useState<FoodSetsInterface[]>([]); 
          เวลาใส่ก็ options={foodSets}

  */

  return (
    <Container maxWidth="md">
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} />     */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display={"flex"}
          sx={{
            marginTop: 2,
            marginX: 2,
            paddingY: 2,
          }}
        >
          <h2>รายการการสั่งอาหารว่าง</h2>
        </Box>
        <hr />
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={4}>
            <h3>ห้องที่จอง</h3>
          </Grid>
          <Grid item xs={8}>
            <TextField
              disabled
              id="Room"
              value={booking?.Room}
            />
          </Grid>
          <Grid item xs={4}>
            <h3>รายการอาหารว่าง</h3>
          </Grid>
          <Grid item xs={8}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={foodSets}
              onChange={(event: any, newValue: FoodSetsInterface | null) => {
                setSelectedFoodSet(newValue);
              }}
              getOptionLabel={option => option.Name}
              sx={{ maxWidth: 300 }}
              renderInput={(params) => <TextField {...params} label="รายการอาหารว่าง" />}
            />
            {/* <Select
              inputProps={{
                name: "FoodSetID"
              }}
              value={selectedFoodSet!.ID}
              onChange={(e: SelectChangeEvent<number>) => { setSelectedFoodSet(foodSets.find(fs => fs.ID === e.target.value) as FoodSetsInterface); }}
            >
              {foodSets.map((foodS: FoodSetsInterface) => (
                <MenuItem key={foodS.ID} value={foodS.ID}>{foodS.Name}</MenuItem>
              ))}
            </Select> */}
            <Button
              variant="contained"
              onClick={addToOrder}
            >
              เพิ่ม
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Food set name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Set price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodOrdered.FoodOrderedFoodSets?.map((item: FoodOrderedFoodSetsInterface, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{foodSets.find(f => f.ID === item.FoodSetID)?.Name}</TableCell>
                    <TableCell>{item.Quantity}</TableCell>
                    <TableCell>{foodSets.find(f => f.ID === item.FoodSetID)?.Price}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" color="success" onClick={() => addQuantity(index)}>+</Button>&nbsp;
                      <Button size="small" variant="outlined" color="error" onClick={() => reduceQuantity(index)}>-</Button>&nbsp;
                      <Button size="small" variant="outlined" color="error" onClick={() => removeFoodSetFromOrdered(index)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
          <Grid item xs={4}>
            <h3>วิธีการชำระเงิน</h3>
          </Grid>
          <Grid item xs={5}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={foodPaymenyTypes}
              onChange={(event: any, newValue: FoodPaymentTypesInterface | null) => {
                setFoodOrdered({ ...foodOrdered, FoodPaymentTypeID: newValue ? newValue.ID : 0 });
              }}
              getOptionLabel={option => option.Name}
              sx={{ maxWidth: 300 }}
              renderInput={(params) => <TextField {...params} label="วิธีการชำระเงิน" />}
            />
            {/* <Select
              inputProps={{
                name: "FoodPaymentTypeID"
              }}
              value={foodOrdered.FoodPaymentTypeID}
              onChange={handleSelectChange}
            >
              {foodPaymenyTypes.map((payment: FoodPaymentTypesInterface) => (
                <MenuItem key={payment.ID} value={payment.ID}>{payment.Name}</MenuItem>
              ))}
            </Select> */}
          </Grid>
          <Grid item xs={3}>
            <TextField
              disabled
              id="Total Price"
              label="ราคารวม"
              value={foodOrdered.TotalPrice}
            />
          </Grid>

          <Grid item xs={4}>
            <h3>เวลา</h3>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disabled
                  value={foodOrdered.FoodTime}
                  onChange={(newValue) => {
                    setFoodOrdered({ ...foodOrdered, FoodTime: newValue ? newValue : new Date() });
                  }}
                  ampm={false}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ float: "right" }} onClick={submit}>บันทึกการสั่งอาหารว่าง</Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={22} >
            <Card sx={{ maxWidth: 850 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image='https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Snack Box
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ฿35 Detail: Classic Bakery and Chabaa
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={22}>
            <Card sx={{ maxWidth: 850 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image='https://images.unsplash.com/photo-1598023192077-5733d6db1518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1012&q=80'
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Coffee Break
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ฿40 Detail: Bakery, Nescafe and Coffeemate
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={22}>
            <Card sx={{ maxWidth: 850 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image='https://images.unsplash.com/photo-1517433670267-08bbd4be890f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1680&q=80'
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Premium Bakery
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ฿65 Detail: Premium Bakery, Classic Bakery and Chabaa
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}