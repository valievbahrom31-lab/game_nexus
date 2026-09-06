import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponDetailComponent } from './weapon-detail.component';

describe('WeaponDetail', () => {
  let component: WeaponDetailComponent;
  let fixture: ComponentFixture<WeaponDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaponDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaponDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
