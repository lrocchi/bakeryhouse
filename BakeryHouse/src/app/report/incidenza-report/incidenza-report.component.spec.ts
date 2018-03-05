import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenzaReportComponent } from './incidenza-report.component';

describe('IncidenzaReportComponent', () => {
  let component: IncidenzaReportComponent;
  let fixture: ComponentFixture<IncidenzaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenzaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenzaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
