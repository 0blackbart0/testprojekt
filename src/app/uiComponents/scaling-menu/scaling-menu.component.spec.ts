import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalingMenuComponent } from './scaling-menu.component';

describe('ScalingMenuComponent', () => {
  let component: ScalingMenuComponent;
  let fixture: ComponentFixture<ScalingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalingMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
