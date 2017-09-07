import { Component, OnInit } from '@angular/core';
import { Store } from "app/entity/store";
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css']
})
export class StoreAddComponent implements OnInit {

  public store: Store = new Store();

  constructor(public dialogRef: MdDialogRef<StoreAddComponent>) { }

  ngOnInit() {
  }

  create(){
    console.log(this + "=" + JSON.stringify(this.store));
    this.dialogRef.close();
  };

}
