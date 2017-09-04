

import { User } from "app/entity/user";
import { CostType } from "app/entity/cost-type";

export class Cost {
  public _id: string;
  public valore: number ;
  public utente: User;
  public tipo: CostType;

  constructor(
    public descrizione: string = "",

    public create_on: string = Date.now().toString(),
    public update_on: string = Date.now().toString(),

  ) {}
}

