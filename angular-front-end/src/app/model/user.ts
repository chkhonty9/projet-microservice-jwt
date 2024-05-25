import {Role} from "./role";

export interface User {
  id: number,
  username: string,
  password: string,
  name: string,
  email: string,
  address: string ,
  phoneNumber: string ,
  roles: Role[]
}
