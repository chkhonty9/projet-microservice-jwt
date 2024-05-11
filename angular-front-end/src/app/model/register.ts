import {Role} from "./role";

export interface Register {
  id: number,
  username: string,
  password: string,
  repassword: string,
  name: string,
  email: string,
  address: string ,
  phoneNumber: string ,
  roles: Array<Role>
}
