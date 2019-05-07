import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/entity/user';
import { UserService } from 'app/_services/user.service';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { UserAddComponent } from 'app/management/gestione-utente/user-add/user-add.component';
import { ConfirmationDialog } from 'app/confirmation-dialog/confirmation-dialog.component';
import { EditDialogComponent } from 'app/edit-dialog/edit-dialog.component';
import { Store } from 'app/entity/store';
import { StoreService } from 'app/_services/store.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'userMngmt',
  templateUrl: './gestione-utente.component.html',
  styleUrls: ['./gestione-utente.component.css']
})
export class GestioneUtenteComponent implements OnInit {



  public users: Observable<User[]>; // Array<User>;
  public stores: Array<Store>;
  public message: string;
  public statusMessage: string;

  dialogRef: MatDialogRef<UserAddComponent>;
  confirmDialog: MatDialogRef<ConfirmationDialog>;
  editDialog: MatDialogRef<EditDialogComponent>;

  constructor(private _storeService: StoreService,  public snackBar: MatSnackBar, private _userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.users = this._userService.users;

    this.getList();
  }

  getList() {
    /* this._userService.getUserList()
     .then(users => { this.users = users; })
      .catch(err => console.log(err)); */
 
      this._userService.loadAll();

  }
  create(user: User) {
    this._userService.addUser(user)
    .then(data =>{
      if (!data.success){
        this.openSnackBar(data.data, 'letto');
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


  getActiveStoresList() {
    this._storeService.getStoreList(true)
      .then(stores => { this.stores = stores; })
      .catch(err => console.log(err));
  }

  openDialog() {
    this.message = '';
    this.dialogRef = this.dialog.open(UserAddComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result !== 'cancel') {
        this.create(this.dialogRef.componentInstance.user);
        this.getList();
      }

    });
  }

  openConfirmationDelete(id: string) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler cancellare questo elemento?'

    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this._userService.delete(id)
          .then(types => { this.getList(); })
          .catch(err => console.log(err));
      }
      this.confirmDialog = null;
    });
  }

  openEditDialog(user: User) {
    /**
     * get Store from db
     */


    this.editDialog = this.dialog.open(EditDialogComponent, {
      disableClose: false
    });
    this.editDialog.componentInstance.userObj = user;
    this.getActiveStoresList();
    this.editDialog.componentInstance.stores = this.stores;
    this.editDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('opeEditDialog result: ' + result);
        this._userService.update(this.editDialog.componentInstance.userObj)
          .then(value =>{ 
            console.log('userService.update', value.success);
            this.getList();
          })
          .catch(err => {
            console.log(err.message); this.message = err.message;
          });
      }
      this.editDialog.componentInstance.userObj = null;
      this.editDialog.componentInstance.stores = null;
      this.editDialog = null;
    });
  }


}
