import { User } from 'app/entity/user';
import { Store } from 'app/entity/store';

export class Balance {
  public _id: string;
  public tipo: {'Pranzo', 'Pomeriggio', 'Cena', 'Chiusura'};
  public value: number;
  public giorno: string = Date.now().toString();
  public user: User;
  public store: Store;

  public cassa: number;
  public pos: number;
  public ticket: number;
  public memoCredit: number;

  public prevCapital: number;
  public capital: number;

}

export enum BalanceType {
  Pranzo = 12,
  Pomeriggio = 16,
  Cena = 20,
  Chiusura = 24
}
