import { User } from "./user.model";

export interface Address {

    id?: String;

    user: String;

    street: String;

    city: String;

    postcode: number;

}