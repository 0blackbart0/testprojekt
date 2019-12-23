import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicNodeComponent } from './basicNode.component';

describe('BasicNodeComponent', () => {
  let component: BasicNodeComponent;
  let fixture: ComponentFixture<BasicNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
