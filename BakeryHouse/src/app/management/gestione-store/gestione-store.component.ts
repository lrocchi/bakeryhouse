import { Component, OnInit } from '@angular/core';
import { Store } from "app/entity/store";
import { StoreService } from "app/_services/store.service";
import { StoreAddComponent } from "app/management/gestione-store/store-add/store-add.component";
import { MdDialogRef, MdDialog } from "@angular/material";
import { EditDialogComponent } from "app/edit-dialog/edit-dialog.component";
import { ConfirmationDialog } from "app/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'storeMngmt',
  templateUrl: './gestione-store.component.html',
  styleUrls: ['./gestione-store.component.css']
})
export class GestioneStoreComponent implements OnInit {
  // constant for swipe action: left or right
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  public stores: Array<Store>;
  public message: string;
  public statusMessage: string;

  dialogRef: MdDialogRef<StoreAddComponent>;
  editDialog: MdDialogRef<EditDialogComponent>;
  confirmDialog: MdDialogRef<ConfirmationDialog>;




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
        this.create(this.dialogRef.componentInstance.store);
        this.getList();
      }

    });
  }

  create(store: Store) {
    this._storeService.addStore(store);
  }


  openEditDialog(store: Store) {
    /**
     * get Store from db
     */
    console.log("STORE ID TO MOD ==>" + JSON.stringify(store));


    this.editDialog = this.dialog.open(EditDialogComponent, {
      disableClose: false
    });
    this.editDialog.componentInstance.storeObj = store;

    this.editDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log("opeEditDialog result: " + result);
        this._storeService.updateStore(this.editDialog.componentInstance.storeObj);
        this.getList();
      }
      this.editDialog = null;
    });
  }


  openConfirmationDelete(id: string) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = "Sei sicuro di voler cancellare questo elemento?"

    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
       this._storeService.delete(id)
          .then(types => { this.getList(); })
          .catch(err => console.log(err));
      }
      this.confirmDialog = null;
    });
  }

}
