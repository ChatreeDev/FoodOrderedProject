import { FoodOrderedsInterface } from "./IFoodOrdered";

export interface FoodPaymentTypesInterface {
    ID: number;
    Name: string;

    FoodOrdereds: FoodOrderedsInterface[];
}