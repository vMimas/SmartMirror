import { TestBed } from '@angular/core/testing';

import { FahrenheitService } from './fahrenheit.service';

describe('FahrenheitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FahrenheitService = TestBed.get(FahrenheitService);
    expect(service).toBeTruthy();
  });
});
