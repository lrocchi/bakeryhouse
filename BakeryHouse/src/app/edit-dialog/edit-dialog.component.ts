import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { Store } from "app/entity/store";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent{

  storeObj: Store = null;

  constructor(public dialogRef: MdDialogRef<EditDialogComponent>) { }



}
