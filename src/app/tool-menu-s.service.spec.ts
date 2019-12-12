import { TestBed } from '@angular/core/testing';

import { ToolMenuSService } from './tool-menu-s.service';

describe('ToolMenuSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolMenuSService = TestBed.get(ToolMenuSService);
    expect(service).toBeTruthy();
  });
});
