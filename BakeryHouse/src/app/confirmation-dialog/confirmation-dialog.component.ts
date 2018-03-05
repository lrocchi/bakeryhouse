import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})

// tslint:disable-next-line:component-class-suffix
export class ConfirmationDialog{
  public confirmMessage: string;
  constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {}




}
