

import { User } from 'app/entity/user';
import { CostType } from 'app/entity/cost-type';
import { Store } from 'app/entity/store';

export class Cost {
  public _id: string;
  public valore: number ;
  public utente: User;
  public tipo: CostType;
  public store: Store;
  public ref_date: string;

  constructor(
    public descrizione: string = '',

    public create_on: string = Date.now().toString(),
    public update_on: string = Date.now().toString(),

  ) {}
}

