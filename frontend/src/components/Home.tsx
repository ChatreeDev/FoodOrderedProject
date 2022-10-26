import { Container } from '@mui/system'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


function Home() {
  return (
    <div>
      <Container maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบบันทึกการสั่งอาหารว่าง</h1>
        <h4><u>Requirements</u></h4>
        <p>
          ระบบการจองใช้บริการห้องของบริษัท Room Booking เป็นระบบที่ให้ผู้ใช้บริการซึ่งเป็นสมาชิกทำการ
          Log in เข้าระบบเพื่อทำการจองห้องต่างๆซึ่งมีห้องดังต่อไปนี้ ห้องเรียน ห้องปฏิบัติการ และห้องอ่านหนังสือ
          โดยระบบจะทำการบันทึกการจองห้องของสมาชิก ทั้งนี้สมาชิกสามารถจองล่วงหน้าได้ภายในสัปดาห์นั้นๆ และมี options
          รายการการสั่งอาหารว่างให้เลือกใช้บริการกันอีกด้วยระบบสั่งอาหารว่างของบริษัท Room Booking เป็นระบบที่ให้ผู้ใช้บริการซึ่งเป็นสมาชิก
          เมื่อทำการจองห้องแล้วจึงสามารถสั่งอาหารว่างมารับประทานได้ โดยจะมีรายการอาหารที่เป็นรูปแบบของ Set อาหารว่าง
          เช่น ชุด Snack box, ชุด Coffee Break และชุด Premium Bakery เป็นต้น สมาชิกสามารถเลือกวิธีการชำระเงิน
          จากนั้นเมื่อบันทึกการสั่งอาหารเรียบร้อยแล้วระบบจะทำการบันทึกข้อมูลการสั่งอาหารของสมาชิกลงบนฐานข้อมูล ทั้งนี้ระบบจะทำการบันทึกประวัติการสั่งอาหาร
          ของสมาชิกเพื่อให้สมาชิกสามารถตรวจสอบได้ว่ามีประวัติการสั่งอาหารอะไรไปแล้วบ้าง
        </p>
        <br />
        <Card sx={{ maxWidth: 850 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Booking
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ยินดีต้อนรับสมาชิกระบบจองใช้ห้องทุกท่าน สมาชิกที่ได้ทำการจองใช้ห้องแล้วจึงสามารถสั่งอาหารว่างได้
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 850 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1589010588553-46e8e7c21788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2160&q=80"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Food Ordered
              </Typography>
              <Typography variant="body2" color="text.secondary">
                สมาชิกระบบจองใช้ห้องทุกท่าน สามารถสั่งอาหารว่างได้ที่หน้าถัดไป ขอบคุณที่ใช้บริการ
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  )
}

export default Home