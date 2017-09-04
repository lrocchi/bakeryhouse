export class CostType {
  public _id:string;
  public nome: string;
  public subCategory: string;
  public active: boolean;
  public hasDescription: boolean;


}


export enum CostTypeCategories{
  Food = 10,
  Delivery = 20,
  Fatture = 31,
  Manutenzione = 32,
  Varie = 33

}
