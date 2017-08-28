

import { User } from "app/entity/user";

export class Spesa {
  public _id: string;
  public valore: number ;
  public utente: User;
  constructor(
    public descrizione: string = "",

    public create_on: string = Date.now().toString(),
    public update_on: string = Date.now().toString(),

  ) {}
}


export class TipoSpesa{

    nome: String;
    valida: boolean;

  }
