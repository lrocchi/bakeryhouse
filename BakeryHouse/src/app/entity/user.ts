



export class User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  email: string;
  ruolo: Ruolo;
}

export enum Ruolo{
  "User",
  "Admin",
  "Super Admin"
}
