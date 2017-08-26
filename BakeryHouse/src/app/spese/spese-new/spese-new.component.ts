import { Component, EventEmitter, Output, } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { NgForm } from "@angular/forms";
import { Spesa } from "app/entity/spesa";

@Component({
  selector: 'app-spese-new',
  templateUrl: './spese-new.component.html',
  styleUrls: ['./spese-new.component.css']
})
export class SpeseNewComponent {


  public loading: boolean = false;
  public spesa: Spesa = new Spesa();

  @Output() createNewSpesaEvent = new EventEmitter<Spesa>();

  constructor(public dialogRef: MdDialogRef<SpeseNewComponent>) { }



  create(){
    //this.loading = true;
    console.log("CREATE " + this.spesa.descrizione);
    // this.createNewSpesaEvent.emit(this.spesa);
    this.dialogRef.close();
    //this.spesa = new Spesa();
    //this. loading = false;
  }

}
