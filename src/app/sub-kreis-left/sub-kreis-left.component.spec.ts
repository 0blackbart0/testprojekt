import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubKreisLeftComponent } from './sub-kreis-left.component';

describe('SubKreisLeftComponent', () => {
  let component: SubKreisLeftComponent;
  let fixture: ComponentFixture<SubKreisLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubKreisLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubKreisLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
