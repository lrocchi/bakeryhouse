

import { Store } from "app/entity/store";

export class User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  ruolo: string;
  puntoVendita: Store;
}

export enum Ruolo{
  'Dipendente' = 100,
  'Store Manager' = 50,
  'Admin' = 10,
  'Super Admin' = 1
}
