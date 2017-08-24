import { User } from "app/user";

export class Spesa {
  public _id: number;
  public valore: number ;
  constructor(
    public descrizione: string = "",

    public create_on: string = Date.now().toString(),
    public update_on: string = Date.now().toString(),
    public utente: User = null
  ) {}
}
