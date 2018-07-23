import { Component, OnInit } from '@angular/core';
import { User } from '../entity/user';
import { MatSnackBar } from '../../../node_modules/@angular/material';
import { UserService } from 'app/_services/user.service';

@Component({
  // selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userObj: User = null;
  constructor(public snackBar: MatSnackBar, private _userService: UserService) { }

  ngOnInit() {
    this.userObj = JSON.parse(localStorage.getItem('currUser'));
  }

  saveUser(){
    // console.log('USER: ' + JSON.stringify(this.userObj));
    this._userService.update(this.userObj)
    .then(data =>{
      if (!data.success){
        this.openSnackBar('ERRORE - ' + data.data, 'letto');
      }else{
        // Aggiornare il cookie
        // console.log(JSON.stringify(data.data));

        localStorage.setItem('currUser', JSON.stringify(this.userObj));
        this.openSnackBar('dati modificati', 'ok');
      }
    });



  }

  openSnackBar(message: string, action: string) {

    let snackBarRef = this.snackBar.open(message, action, {
      //duration: 5000,
    });

    snackBarRef.onAction().subscribe(() => {
      
      snackBarRef.dismiss();
    });

  }

}
