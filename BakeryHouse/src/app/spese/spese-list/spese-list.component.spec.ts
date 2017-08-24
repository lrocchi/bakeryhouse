import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeseListComponent } from './spese-list.component';

describe('SpeseListComponent', () => {
  let component: SpeseListComponent;
  let fixture: ComponentFixture<SpeseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
