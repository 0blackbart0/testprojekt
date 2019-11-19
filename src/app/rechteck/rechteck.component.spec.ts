import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechteckComponent } from './rechteck.component';

describe('RechteckComponent', () => {
  let component: RechteckComponent;
  let fixture: ComponentFixture<RechteckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechteckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechteckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
