import { Component, OnInit, ViewChild } from '@angular/core';
import { Spesa } from 'app/spese/spesa';
import { SpesaService } from 'app/spese/spesa.service';
import { MdDialog, MdDialogRef } from "@angular/material";
import { SpeseNewComponent } from "app/spese/spese-new/spese-new.component";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-spese',
    templateUrl: 'spese.component.html',
    styleUrls: ['spese.component.css']
})
export class SpeseComponent implements OnInit {

  public visible: boolean = false;
  today: number = Date.now();
  dialogRef: MdDialogRef<SpeseNewComponent>;
  spesaList: Array<Spesa>;



  constructor( private _spesaService: SpesaService, public dialog: MdDialog) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    // this._spesaService.getSpesaList()
    this._spesaService.getTodaySpesaList()
    .then(spese => this.spesaList = spese)
    .catch(err => console.log(err));
  }

  create(spesa: Spesa){
    console.log("ECCO");
    let tmpSpesa: Spesa = spesa;
    tmpSpesa.utente = JSON.parse(localStorage.getItem('currUser'));

    this._spesaService.addSpesa(tmpSpesa)
    .then((data) => {
      if(data.success){
        this.getList();

      }else{
        console.log(data.message);
      }

    })
    .catch(err => console.log(err));
    this.closeDialog();

  }


  openDialog(){
    // this.visible = !this.visible;
    let dialogRef = this.dialog.open(SpeseNewComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  closeDialog(){
    this.dialog.closeAll();
  }




}


