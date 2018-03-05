import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTypeAddComponent } from './cost-type-add.component';

describe('CostTypeAddComponent', () => {
  let component: CostTypeAddComponent;
  let fixture: ComponentFixture<CostTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
