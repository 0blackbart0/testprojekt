import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubKreisRightComponent } from './sub-kreis-right.component';

describe('SubKreisRightComponent', () => {
  let component: SubKreisRightComponent;
  let fixture: ComponentFixture<SubKreisRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubKreisRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubKreisRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
