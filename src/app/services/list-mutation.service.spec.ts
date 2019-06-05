import { TestBed } from '@angular/core/testing';

import { ListMutationService } from './list-mutation.service';

describe('ListMutationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListMutationService = TestBed.get(ListMutationService);
    expect(service).toBeTruthy();
  });
});
