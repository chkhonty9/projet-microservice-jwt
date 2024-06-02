import {Role} from "./role";

export class User {
  id: number | null = null;
  username: string = '';
  password: string = '';
  name: string = '';
  email: string= '';
  address: string = '';
  phoneNumber: string = '';
  roles: Role[]= []
  constructor() {}
}
