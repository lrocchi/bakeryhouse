import { User } from 'app/entity/user';
import { Store } from 'app/entity/store';

export class Balance {

  /* db properties */
  public _id: string;
  public type: string;
  public value: number;
  public create_on: string = Date.now().toString();
  public ref_date: string ;
  public user: User;
  public store: Store;
  public pos: number;
  public ticket;
  public memoCredit: number;
  public prevCapital: number;
  public capital: number;
  public flash: number;
  
  public preconti: number;
  public tavoliAperti: number;
  public rafa: number;
    
  public comp_filename: string;

  // tslint:disable-next-line:one-line
  constructor(public cassa: number = 0,
    public compensazione: number = 0, public riserva: number = 0,
    public speseTotali: number = 0){}




}

export enum BalanceType {
  Pranzo = 25,
  Pomeriggio = 50,
  Cena = 75,
  Chiusura = 100
}
