import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { CostType } from 'app/entity/cost-type';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CostTypeAddComponent } from 'app/management/gestione-spese/cost-type-add/cost-type-add.component';
import { SpesaService } from 'app/_services/spesa.service';
import { ConfirmationDialog } from 'app/confirmation-dialog/confirmation-dialog.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'speseMngmt',
  templateUrl: 'gestione-spese.component.html',
  styleUrls: ['gestione-spese.component.scss']
})
export class GestioneSpeseComponent implements OnInit {


  dialogRef: MatDialogRef<CostTypeAddComponent>;
  confirmDialog: MatDialogRef<ConfirmationDialog>;

  // 1. Template Ref types
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  // 2. Other Variables
  message: string;
  costType: CostType;
  costTypes: Array<CostType>;
  statusMessage: string;

  constructor(private _spesaService: SpesaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._spesaService.getTypeList()
      .then(types => { this.costTypes = types; })
      .catch(err => console.log(err));


  }


  openDialog() {
    this.message = '';
    this.dialogRef = this.dialog.open(CostTypeAddComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result !== 'cancel') {
        console.log(this.dialogRef.componentInstance.costType);
        this.create(this.dialogRef.componentInstance.costType);
      }

    });

  }

  closeDialog() {
    this.dialog.closeAll();
  }

  create(type: CostType) {
    console.log('ECCO');


    this._spesaService.addType(type)
      .then((data) => {
        if (data.success) {
          this.getList();

        } else {
          console.log(data.message);
          this.message = data.message
        }

      })
      .catch(err => {
        console.log(err);
        this.statusMessage = err;
      });
    this.closeDialog();

  }


  openConfirmationDelete(id: string) {
    this.confirmDialog = this.dialog.open(ConfirmationDialog, {
      disableClose: false
    });
    this.confirmDialog.componentInstance.confirmMessage = 'Sei sicuro di voler cancellare questo elemento?'

    this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        console.log('CANCELLA');
        this._spesaService.deleteCategory(id)
          .then(types => { this.getList(); })
          .catch(err => console.log(err));
      }
      this.confirmDialog = null;
    });
  }


}
