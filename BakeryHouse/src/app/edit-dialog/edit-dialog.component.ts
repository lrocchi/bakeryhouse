import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from 'app/entity/store';
import { User, Ruolo } from 'app/entity/user';
import { StoreService } from 'app/_services/store.service';
import { Balance } from 'app/entity/Balance';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

title: String = 'Modifica';

  storeObj: Store = null;
  userObj: User = null;
  balanceObj: Balance = null;
  roles = Ruolo;
  public stores: Array<Store>;

  constructor(private _storeService: StoreService, public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getActiveStoresList();
  }

  getActiveStoresList(){
    this._storeService.getStoreList(true)
    .then(stores => { this.stores = stores; })
    .catch(err => console.log(err));
  }

}
