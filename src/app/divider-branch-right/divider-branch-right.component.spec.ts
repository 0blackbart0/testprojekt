import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerBranchRightComponent } from './divider-branch-right.component';

describe('DividerBranchRightComponent', () => {
  let component: DividerBranchRightComponent;
  let fixture: ComponentFixture<DividerBranchRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerBranchRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerBranchRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
