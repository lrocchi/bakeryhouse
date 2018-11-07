import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BalanceService } from 'app/_services/balance.service';
import { Balance, BalanceType } from 'app/entity/Balance';
import { User } from 'app/entity/user';
import { MatDialogRef, MatDialog } from '@angular/material';
import { EditDialogComponent } from 'app/edit-dialog/edit-dialog.component';
import { Observable, Subscription } from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { takeWhile } from 'rxjs/operators';
import { ConfirmationDialog } from 'app/confirmation-dialog/confirmation-dialog.component';
// import { SharedService } from "app/_services/shared.service";
import { FileUploader } from 'ng2-file-upload';
import { FilesService } from 'app/_services/file.service';



@Component({
  selector: 'app-chiusure',
  templateUrl: './chiusure.component.html',
  styleUrls: ['./chiusure.component.css']
})
export class ChiusureComponent implements OnInit, OnDestroy {

  private files = [];
  private uploader: FileUploader;

  user: any;
  private alive: boolean;
  message: string;
  spinnerColor = 'normal';
  spinnerMode = 'determinate';

  public lastBalance: Balance = new Balance();
  // prevCapital: number;
  usr: User;
  balance: Array<Balance>;

  // confirmDialog: MatDialogRef<ConfirmationDialog>;
  editDialog: MatDialogRef<EditDialogComponent>;
  confirmDialog: MatDialogRef<ConfirmationDialog>;
  constructor(
    private FileService: FilesService,
    private _balanceService: BalanceService,
    /* private sharedService: SharedService,*/
    private ref: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.alive = true;
    this.usr = JSON.parse(localStorage.getItem('currUser'));

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currUser'));
    this.getList();


    TimerObservable.create(0, 5000)
      .takeWhile(() => this.alive)
      .subscribe(() => this.getList());


    this.uploader = new FileUploader({ url: 'api/upload',
    queueLimit: 1 });
    
  };

    this.FileService.showFileNames().subscribe(response => {
      try {
        for (let i = 0; i < response.json().length; i++) {
          this.files[i] = {
            filename: response.json()[i].filename,
            originalname: response.json()[i].originalname,
            contentType: response.json()[i].contentType
          };
        }
      } catch (error) {
        console.log('ChiusureComponent: ' + error);
      }


    });

    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      // console.log("ImageUpload:uploaded:", item, status, response);

      this.lastBalance.comp_filename = JSON.parse(response).file_name;
      this.lastBalance.compensazione = this.lastBalance.rafa;
      // console.log('Luca->', JSON.parse(response).file_name, this.lastBalance);
      try {
        this._balanceService.updateBalance(this.lastBalance);
      } catch (error) {
        console.log(error);
      }

    };
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getList() {
    this._balanceService
      .getTodayBalanceList(this.usr.store)
      .then(balanceDoc => {
        this.balance = balanceDoc;
        if (balanceDoc.length > 0) {
          // this.sharedService.lastBalance.next(balanceDoc[0]);
          this.lastBalance = balanceDoc[0];
        } else {
          this._balanceService
            .getLastBalance(this.usr.store)
            .then(lastBalanceDoc => {
              this.lastBalance = lastBalanceDoc;
              // this.sharedService.lastBalance.next(lastBalanceDoc);
            });
        }
        this.ref.detectChanges();
      })
      .catch(err => console.log(err));
  }

  addBalance(bal: Balance) {
    this._balanceService
      .addBalance(bal)
      .then(value => {

        // console.log("AddBalance" + JSON.stringify(value));
      })
      .catch(err => {
        console.log(err.message);
        this.message = err.message;

      });
  }
  openEditDialog() {
    /**
     * get Store from db
     */

    this.editDialog = this.dialog.open(EditDialogComponent, {
      disableClose: false
    });

    const balance = new Balance();
    balance.ref_date = this.usr.store.ref_date; // new Date().toString();
    balance.user = this.usr;
    balance.store = this.usr.store;

    if (this.balance[0]) {
      balance.value = this.balance[0].value + 25;
    } else {
      balance.value = 25;
    }

    balance.type = BalanceType[balance.value];

    this.editDialog.componentInstance.balanceObj = balance;
    this.editDialog.componentInstance.title = 'Aggiungi resoconto';

    this.editDialog.afterClosed().subscribe(result => {
      if (result) {
        this.addBalance(this.editDialog.componentInstance.balanceObj);

      }
      this.editDialog.componentInstance.balanceObj = null;
      this.editDialog = null;

    });
  }

  openConfirmationDelete(id: string) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler eliminare questo rendiconto?'

    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('CANCELLA');
        this._balanceService.deleteBalance(id)
          .then(types => { })
          .catch(err => console.log(err));
      }
      this.confirmDialog = null;
    });

  }

  enableCompensation() {
    var enable: boolean = false;
    // console.log('enableCompensation: ',this.user.store.compensazione, this.lastBalance.type );
    if (this.user.store.compensazione == true && this.lastBalance.type == 'Chiusura') {
      enable = true;
      if (this.lastBalance.comp_filename) {
        if (this.lastBalance.comp_filename.length > 1) {
          enable = false;
        }
      }
    }

    return enable;
  }
}
