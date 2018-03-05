import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeseNewComponent } from './spese-new.component';

describe('SpeseNewComponent', () => {
  let component: SpeseNewComponent;
  let fixture: ComponentFixture<SpeseNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeseNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeseNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
