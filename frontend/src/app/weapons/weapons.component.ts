import { Component, inject, signal, computed} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeaponsService } from './weapons.service';
import { Weapon } from './weapon';
import { BehaviorSubject, merge, map} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './weapons.html',
  styleUrls: ['./weapons.css']
})

export class WeaponsComponent{
            
  private weaponsService = inject(WeaponsService) 
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  private weapons = toSignal(this.weaponsService.getWeapons(),{initialValue: [] as Weapon[] } )
  
  showPowerful = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('powerful') === 'true')
    ),
    {initialValue: false}
  )

  sortByDamage = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('sort') === 'damage')
    ),
    {initialValue: false}
  )
  
  search$ = new BehaviorSubject<string>('')

  debouncedSearch$ = this.search$.pipe(
    debounceTime(400),
    distinctUntilChanged()
  )

  private debouncedSearch = toSignal(this.debouncedSearch$, {initialValue: ''})

  weaponTypes = computed (() => (
   [...new Set (this.weapons().map(w => w.type))]
  ))
    
  
  selectedTypes = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.getAll('type'))
    ),
    {initialValue: [] as string[]}
  )


  filteredWeapons = computed(() => {
        
        let result = [...this.weapons()]

          if(this.selectedTypes().length > 0){
            result = result.filter(weapon => this.selectedTypes().includes(weapon.type))
          }
          if (this.showPowerful()) {
            result =  result.filter(weapon =>  weapon.damage >= 60)
          }
          const search = this.debouncedSearch().toLocaleLowerCase().trim();

          if(search) {
            result = result.filter(weapon => weapon.name.toLowerCase().includes(search))
          }
          if (this.sortByDamage()) {
            result = [...result].sort((weapon_a, weapon_b) => weapon_b.damage - weapon_a.damage )
          }
          return result
      }
    )
  
  setSearch(inputValue: string){
    this.search$.next(inputValue)
  }
  
  toggleShowPowerful(){
     this.router.navigate(
      [],
      {
        queryParams:{
          powerful: this.showPowerful() ? null : 'true'
        },
        queryParamsHandling: 'merge'
      }
    )
  }

  toggleSortByDamage(){
      this.router.navigate(
      [],
      {
        queryParams:{
          sort: this.sortByDamage() ? null : 'damage'
        },
        queryParamsHandling: 'merge'
      }
    )
     
    }
   
  toggleType(type: string){
    const currentTypes = this.selectedTypes();

    const newTypes = currentTypes.includes(type) 
    ? currentTypes.filter(t => t !== type) 
    : [...currentTypes, type]

    this.router.navigate(
      [],
      {
        queryParams:{
          type: newTypes.length > 0 ? newTypes : null  
        },
        queryParamsHandling: 'merge'
      }
    )
  }

  resetFilters(): void {
    this.router.navigate(
      [],
      {
        queryParams:{
           sort: null,
           powerful: null,
           type: null
        }
      }
    )
    
    this.search$.next('');
  }

}



