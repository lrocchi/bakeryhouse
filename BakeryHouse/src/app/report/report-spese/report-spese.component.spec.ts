import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpeseComponent } from './report-spese.component';

describe('ReportSpeseComponent', () => {
  let component: ReportSpeseComponent;
  let fixture: ComponentFixture<ReportSpeseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSpeseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSpeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
