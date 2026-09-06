import { Routes } from '@angular/router';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { PlayersComponent } from './players/players.component';

export const routes: Routes = [
  { path: 'weapons', component: WeaponsComponent},
  {path: 'weapons/:id', component: WeaponDetailComponent},
  {path: 'players',component: PlayersComponent}
];
