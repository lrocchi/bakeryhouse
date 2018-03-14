import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRendicontiComponent } from './report-rendiconti.component';

describe('ReportRendicontiComponent', () => {
  let component: ReportRendicontiComponent;
  let fixture: ComponentFixture<ReportRendicontiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportRendicontiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRendicontiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
