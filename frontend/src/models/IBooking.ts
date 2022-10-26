import { FoodOrderedsInterface } from "./IFoodOrdered";
import { UsersInterface } from "./IUser";

/* เอา Field มาจาก Backend เชค type ให้ตรงด้วย (type วิธีเขียนไม่เหมือนกันนะ)

*/

export interface BookingsInterface {
    ID: number;
    Room: string;

    BookingTimeStart: Date;
    BookingTimeStop: Date;

    MemberID: number;
    Member: UsersInterface;     //มันเป็น Object

    FoodOrdereds: FoodOrderedsInterface[];  //Interface FoodOrdered มันรับเป็น Array
}