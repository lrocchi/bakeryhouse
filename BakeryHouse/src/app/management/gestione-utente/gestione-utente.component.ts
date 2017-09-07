import { Component, OnInit } from '@angular/core';
import { User } from "app/entity/user";
import { UserService } from "app/_services/user.service";
import { MdDialogRef, MdDialog } from "@angular/material";
import { UserAddComponent } from "app/management/gestione-utente/user-add/user-add.component";

@Component({
  selector: 'userMngmt',
  templateUrl: './gestione-utente.component.html',
  styleUrls: ['./gestione-utente.component.css']
})
export class GestioneUtenteComponent implements OnInit {


  public users: Array<User>;
  public message: string;
  public statusMessage: string;


  dialogRef: MdDialogRef<UserAddComponent>;

  constructor(private _userService: UserService, public dialog: MdDialog ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this._userService.getUserList()
      .then(users => { this.users = users; })
      .catch(err => console.log(err));


  }
  create(user: User) {

    this._userService.addUser(user);

  }


  openDialog() {
    this.message = "";
    this.dialogRef = this.dialog.open(UserAddComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result != "cancel") {
        this.create(this.dialogRef.componentInstance.user);
        this.getList();
      }

    });
  }


}
