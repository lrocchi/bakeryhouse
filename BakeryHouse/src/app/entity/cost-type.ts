export class CostType {
  public _id: string;
  public nome: string;
  public subCategory: string;
  public active: boolean;
  public hasDescription: boolean;


}


export enum CostTypeCategories{
  Food = 10,
  Delivery = 20,
  Ticket = 30,
  Fatture = 100,
  Manutenzione = 120,
  Varie = 200

}
