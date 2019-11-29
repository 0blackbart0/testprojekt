import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubKreisCenterComponent } from './sub-kreis-center.component';

describe('SubKreisCenterComponent', () => {
  let component: SubKreisCenterComponent;
  let fixture: ComponentFixture<SubKreisCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubKreisCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubKreisCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
