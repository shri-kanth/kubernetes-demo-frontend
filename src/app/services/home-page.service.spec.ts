import { TestBed } from '@angular/core/testing';

import { HomePageService } from './home-page.service';

describe('HomePageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomePageService = TestBed.get(HomePageService);
    expect(service).toBeTruthy();
  });
});
