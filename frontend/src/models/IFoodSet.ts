import { FoodOrderedFoodSetsInterface } from "./IFoodOrdered";

export interface FoodSetsInterface {
    ID: number;

    Name: string;
    Detail: string;
    Price: number;

    FoodOrderedFoodSets: FoodOrderedFoodSetsInterface[];
}