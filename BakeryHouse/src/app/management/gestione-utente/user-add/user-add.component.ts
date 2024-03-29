import { Component, OnInit } from '@angular/core';
import { User, Ruolo } from 'app/entity/user';
import { Store } from 'app/entity/store';
import { MatDialogRef } from '@angular/material';
import { StoreService } from 'app/_services/store.service';
import { NgForm } from '@angular/forms';


@Component({
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  public user: User = new User();
  public ruoli = Ruolo;
  public stores: Array<Store>;
  public currentUser: any;
  // public currentStore: Store;



  constructor(  private _storeService: StoreService, public dialogRef: MatDialogRef<UserAddComponent>) { 
    this.currentUser = JSON.parse(localStorage.getItem('currUser'));
    // this.currentStore = this.currentUser.store;
    // console.log(JSON.stringify(this.currentStore));
    if(this.currentUser.ruolo == 'StoreManager'){
      this.user.ruolo = 'Dipendente';
      this.user.store = this.currentUser.store;
    }
  }

  ngOnInit() {
    this.getActiveStoresList();
  }

  getActiveStoresList(){
    this._storeService.getStoreList(true)
    .then(stores => { this.stores = stores; })
    .catch(err => console.log(err));
  }


  create(myForm: NgForm) {
    console.log('UserAddComponent=' + JSON.stringify(this.user));
    this.dialogRef.close();
  }

}
