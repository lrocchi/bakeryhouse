import { User } from 'app/entity/user';

export class Store {
  _id: string;
  nome: string;
  indirizzo: string;
  piva: string;
  active = true;
  ref_date: string;
  compensazione= true;

}
