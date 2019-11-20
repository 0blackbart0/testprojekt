import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartShapeComponent } from './start-shape.component';

describe('StartShapeComponent', () => {
  let component: StartShapeComponent;
  let fixture: ComponentFixture<StartShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
