import { TestBed } from '@angular/core/testing';

import { JsonNodeListService } from './json-node-list.service';

describe('JsonNodeListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonNodeListService = TestBed.get(JsonNodeListService);
    expect(service).toBeTruthy();
  });
});
