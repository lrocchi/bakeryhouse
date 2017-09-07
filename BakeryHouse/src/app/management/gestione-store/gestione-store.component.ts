import { Component, OnInit } from '@angular/core';
import { Store } from "app/entity/store";
import { StoreService } from "app/_services/store.service";
import { StoreAddComponent } from "app/management/gestione-store/store-add/store-add.component";
import { MdDialogRef, MdDialog } from "@angular/material";

@Component({
  selector: 'storeMngmt',
  templateUrl: './gestione-store.component.html',
  styleUrls: ['./gestione-store.component.css']
})
export class GestioneStoreComponent implements OnInit {

  public stores: Array<Store>;
  public message: string;
  public statusMessage: string;

  dialogRef: MdDialogRef<StoreAddComponent>;



  constructor(private _storeService: StoreService, public dialog: MdDialog) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this._storeService.getStoreList(false)
      .then(stores => { this.stores = stores; })
      .catch(err => console.log(err));


  }

  openDialog() {

    this.message = "";
    this.dialogRef = this.dialog.open(StoreAddComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result != "cancel") {
        console.log(this.dialogRef.componentInstance.store);
        this.create(this.dialogRef.componentInstance.store);
        this.getList();
      }

    });
  }

  create(store: Store) {
    this._storeService.addStore(store);
  }

}
