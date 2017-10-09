import { Component, OnInit, Input } from '@angular/core';
import { CostType, CostTypeCategories } from 'app/entity/cost-type';
import { MatDialogRef } from '@angular/material';
import { SpesaService } from 'app/_services/spesa.service';

@Component({
  templateUrl: './cost-type-add.component.html',
  styleUrls: ['./cost-type-add.component.css']
})
export class CostTypeAddComponent implements OnInit {
  categories: any;


  public loading = false;
  costType: CostType= new CostType();
  public categoryTypes = CostTypeCategories;


  constructor(private _spesaService: SpesaService, public dialogRef: MatDialogRef<CostTypeAddComponent>) { }


  @Input() public set dropdownType(value: any) {
    console.log(value);
};

  ngOnInit(): void {
    this._spesaService.getCategoriesList()
    .then(cat => {this.categories = cat; })
    .catch(err => console.log(err));
  }

  create(){
    // this.loading = true;
    console.log('CREATE ' + this.costType.nome);
    // this.createNewSpesaEvent.emit(this.spesa);
    this.dialogRef.close();
    // this.spesa = new Cost();
    // this. loading = false;
  }
}
