import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneUtenteComponent } from './gestione-utente.component';

describe('GestioneUtenteComponent', () => {
  let component: GestioneUtenteComponent;
  let fixture: ComponentFixture<GestioneUtenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestioneUtenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
