import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { Store } from "app/entity/store";
import { User, Ruolo } from "app/entity/user";
import { StoreService } from 'app/_services/store.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {



  storeObj: Store = null;
  userObj: User = null;
  roles = Ruolo;
  public stores: Array<Store>;

  constructor(private _storeService: StoreService, public dialogRef: MdDialogRef<EditDialogComponent>) { }

  ngOnInit() {
    this.getActiveStoresList();
  }

  getActiveStoresList(){
    this._storeService.getStoreList(true)
    .then(stores => { this.stores = stores; })
    .catch(err => console.log(err));
  }

}
