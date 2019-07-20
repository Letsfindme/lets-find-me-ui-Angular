import { Address } from "./address";


export class User {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  address?: Address[];
}
