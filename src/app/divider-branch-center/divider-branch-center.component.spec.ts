import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerBranchCenterComponent } from './divider-branch-center.component';

describe('DividerBranchCenterComponent', () => {
  let component: DividerBranchCenterComponent;
  let fixture: ComponentFixture<DividerBranchCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerBranchCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerBranchCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
