import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { Store } from "app/entity/store";
import { User, Ruolo } from "app/entity/user";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  ngOnInit(): void {
    console.log("INIT*****************************************");
  }

  storeObj: Store = null;
  userObj: User = null;
  roles = Ruolo;
  public stores: Array<Store>;

  constructor(public dialogRef: MdDialogRef<EditDialogComponent>) { }



}
