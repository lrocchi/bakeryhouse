import { Component, OnInit } from '@angular/core';
import { Store } from 'app/entity/store';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css']
})
export class StoreAddComponent implements OnInit {

  public store: Store = new Store();

  constructor(public dialogRef: MatDialogRef<StoreAddComponent>) { }

  ngOnInit() {
  }

  create(){
    console.log(this + '=' + JSON.stringify(this.store));
    this.dialogRef.close();
  };

}
