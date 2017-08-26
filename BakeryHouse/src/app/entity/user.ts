



export class User {
  _id: string;
  name: string;
  surname: string;
  username: string;
  password: string;
  ruolo: Ruolo;
}

export enum Ruolo{
  "Bancone & Cassa",
  "Candidato pre-apertura",
  "Cuoco",
  "Resp. Cuxina",
  "Resp. Pasticceria",
  "Resp. Sala",
  "Restourant Manager",
  "Sala",
  "Super Admin",
  "Supporto Casa Madre"
}
