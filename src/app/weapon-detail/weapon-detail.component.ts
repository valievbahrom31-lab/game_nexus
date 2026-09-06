import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeaponsService } from '../weapons/weapons.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-weapon-detail',
  imports: [],
  templateUrl: './weapon-detail.html',
  styleUrl: './weapon-detail.css',
})
export class WeaponDetailComponent {
  private route = inject(ActivatedRoute)
  private weaponsService = inject(WeaponsService)

  weapon = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'))
        return this.weaponsService.getWeapon(id)
      })
    )
  )


}
