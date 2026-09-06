import { TestBed } from '@angular/core/testing';

import { WeaponsComponent } from './weapons.component';

describe('Weapons', () => {
  let service: WeaponsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaponsComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
