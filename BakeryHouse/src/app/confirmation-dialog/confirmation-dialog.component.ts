import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html'
})

export class ConfirmationDialog{

  constructor(public dialogRef: MdDialogRef<ConfirmationDialog>) {}

    public confirmMessage:string;


}
