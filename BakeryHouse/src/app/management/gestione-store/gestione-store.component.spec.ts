import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneStoreComponent } from './gestione-store.component';

describe('GestioneStoreComponent', () => {
  let component: GestioneStoreComponent;
  let fixture: ComponentFixture<GestioneStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
