import { Component, OnInit } from '@angular/core';
import { User } from "app/entity/user";
import { UserService } from "app/_services/user.service";

@Component({
  selector: 'app-gestione-utente',
  templateUrl: './gestione-utente.component.html',
  styleUrls: ['./gestione-utente.component.css']
})
export class GestioneUtenteComponent implements OnInit {

  public users: Array<User>;
  public message:string;
  public statusMessage:string;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.getList();
  }

  getList(){
    this._userService.getUserList()
    .then(users => {this.users = users; })
    .catch(err => console.log(err));


  }
}
