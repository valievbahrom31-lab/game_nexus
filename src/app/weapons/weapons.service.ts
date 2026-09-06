import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map , tap} from 'rxjs';
import { Weapon } from './weapon';

@Injectable({
  providedIn: 'root'
})
export class WeaponsService {

  constructor(private http: HttpClient){}

  getWeapons(): Observable<Weapon[]> {
    return this.http.get<Weapon[]>('http://127.0.0.1:8000/api/weapons')
  }

  getWeapon(id: number): Observable<Weapon>{
    return this.http.get<Weapon>(`http://127.0.0.1:8000/api/weapons/${id}`)
  }

}