import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiusureComponent } from './chiusure.component';

describe('ChiusureComponent', () => {
  let component: ChiusureComponent;
  let fixture: ComponentFixture<ChiusureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiusureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiusureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
