import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonologComponent } from './monolog.component';

describe('MonologComponent', () => {
  let component: MonologComponent;
  let fixture: ComponentFixture<MonologComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonologComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
