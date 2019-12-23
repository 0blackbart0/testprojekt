import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DividerBranchLeftComponent } from './divider-branch-left.component';

describe('DividerBranchLeftComponent', () => {
  let component: DividerBranchLeftComponent;
  let fixture: ComponentFixture<DividerBranchLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DividerBranchLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerBranchLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
