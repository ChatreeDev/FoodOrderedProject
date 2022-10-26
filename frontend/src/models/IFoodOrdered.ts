import { BookingsInterface } from "./IBooking";
import { FoodPaymentTypesInterface } from "./IFoodPaymentType";
import { FoodSetsInterface } from "./IFoodSet";

/*  Interface มีเอาไว้ทำอะไร ? Ans. เป็นการกำหนดโครงสร้างของข้อมูล
    เวลาเราเรียกใช้มันจะได้หาชื่อได้ง่าย
    key ลัด : command + . => ทำ quick fiq แล้วก็กด auto import
*/

export interface FoodOrderedsInterface {
    ID: number;

    FoodTime: Date;

    FoodPaymentTypeID: number;
    FoodPaymentType: FoodPaymentTypesInterface;

    BookingID: number;
    Booking: BookingsInterface;

    FoodOrderedFoodSets: FoodOrderedFoodSetsInterface[];

    TotalPrice: number;
}

// เอาสองตารางนี้ไว้ด้วยกันเพราะมันเป็นตารางบันทึกทั้งคู่
export interface FoodOrderedFoodSetsInterface {
    ID: number;

    FoodOrderedID: number;
    FoodOrdered: FoodOrderedsInterface;

    FoodSetID: number;
    FoodSet: FoodSetsInterface;

    Quantity: number;
}