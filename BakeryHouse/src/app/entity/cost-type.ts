import { Store } from 'app/entity/store';

export class CostType {
  public _id: string;
  public nome: string;
  public subCategory: string;
  public active: boolean;
  public hasDescription: boolean;
  public store: Store;
  public percentage: number;


  constructor() {
    this.active = true;
    this.hasDescription = true;
    this.percentage = 1;
  }


}


export enum CostTypeCategories {
  Food = 10,
  Delivery = 20,
  Ticket = 30,
  Stipendi = 100,
  Manutenzione = 120,
  Utility = 140,
  Varie = 200

}
