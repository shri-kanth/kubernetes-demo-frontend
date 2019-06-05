import { TestBed } from '@angular/core/testing';

import { ItemMutationService } from './item-mutation.service';

describe('ItemMutationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemMutationService = TestBed.get(ItemMutationService);
    expect(service).toBeTruthy();
  });
});
