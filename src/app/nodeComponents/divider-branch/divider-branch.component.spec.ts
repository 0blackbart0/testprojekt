import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerBranchComponent } from './divider-branch.component';

describe('DividerBranchComponent', () => {
  let component: DividerBranchComponent;
  let fixture: ComponentFixture<DividerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
