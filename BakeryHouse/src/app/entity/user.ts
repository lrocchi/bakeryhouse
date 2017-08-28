

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
  "Dipendente",
  "Store Manager",
  "Admin",
  "Super Admin"
}
