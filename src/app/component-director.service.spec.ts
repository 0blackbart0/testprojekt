import { TestBed } from '@angular/core/testing';

import { ComponentDirectorService } from './component-director.service';

describe('ComponentDirectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentDirectorService = TestBed.get(ComponentDirectorService);
    expect(service).toBeTruthy();
  });
});
