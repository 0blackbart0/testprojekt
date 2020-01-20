import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoMenuComponent } from './undo-menu.component';

describe('UndoMenuComponent', () => {
  let component: UndoMenuComponent;
  let fixture: ComponentFixture<UndoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
