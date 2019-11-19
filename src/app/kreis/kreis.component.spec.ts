import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KreisComponent } from './kreis.component';

describe('KreisComponent', () => {
  let component: KreisComponent;
  let fixture: ComponentFixture<KreisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KreisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KreisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
