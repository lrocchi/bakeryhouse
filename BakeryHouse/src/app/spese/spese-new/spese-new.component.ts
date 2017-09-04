import { Component, EventEmitter, Output, OnInit, } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { NgForm, FormControl, Validators } from "@angular/forms";
import { Cost } from "app/entity/cost";
import { CostType, CostTypeCategories } from "app/entity/cost-type";
import { SpesaService } from "app/_services/spesa.service";


@Component({
  // selector: 'app-spese-new',
  templateUrl: './spese-new.component.html',
  styleUrls: ['./spese-new.component.css']
})
export class SpeseNewComponent implements OnInit {



  public descrizioneFormControl = new FormControl('', [
    Validators.required,
  ]);



  public categoryTypes = CostTypeCategories;
  public tmpCategory: string;
  public loading: boolean = false;
  public spesa: Cost = new Cost();
  public costTypes: Array<CostType>;

  @Output() createNewSpesaEvent = new EventEmitter<Cost>();

  constructor(private _spesaService: SpesaService, public dialogRef: MdDialogRef<SpeseNewComponent>) { }

  ngOnInit(): void {

  }

  setDescription() {

    this.spesa.descrizione = this.spesa.tipo.subCategory;
  }

  getSubCategoryList() {

    this._spesaService.getSubTypeList(this.tmpCategory)
      .then(costType => {
        this.costTypes = costType;
        if ((this.tmpCategory != 'Food') && (this.tmpCategory != 'Delivery')) {
          console.log("tmpCategory=" + this.tmpCategory);
          console.log(JSON.stringify(costType));

          this.spesa.tipo = costType[0];
        }
      })
      .catch(err => console.log(err));
  }

  create() {

    this.dialogRef.close();

  }

}