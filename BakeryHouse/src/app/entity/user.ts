

import { Store } from 'app/entity/store';

export class User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  ruolo: string;
  store: Store;
  active: boolean;
}

// tslint:disable-next-line:one-line
export enum Ruolo{
  Dipendente = 100,
  StoreManager = 50,
  Admin = 10,
  SuperAdmin = 1
}
