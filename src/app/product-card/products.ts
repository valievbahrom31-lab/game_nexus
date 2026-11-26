import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { signal } from '@angular/core';
import { Weapon } from '../weapons/weapon';
import { catchError, finalize, min, Observable, of, throwError, map, filter, tap, Subject, switchMap, debounceTime, distinctUntilChanged} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products = signal<Weapon[]>([])
  
  isLoading = signal(false)
  errorMessage = signal('')

  removeProduct = (id: number) =>{
      this.products.update(products =>
      products.filter(product => product.id !== id)
      )
    }

  public http = inject(HttpClient)

  search$ = new Subject<string>()

  weapons$ = this.search$.pipe(
    debounceTime(400),
    distinctUntilChanged(),

    switchMap(search =>{
     this.errorMessage.set('')

     return this.http.get<Weapon[]>(`/api/weapons`,{params: new HttpParams().set('search',search)})
      .pipe(
        catchError((error: HttpErrorResponse) =>{
          switch(error.status){
            
          case 0:
            this.errorMessage.set('Network error')
            break

          case 404:
            this.errorMessage.set('Weapon not found')
            break

          case 500:
            this.errorMessage.set('Server error')
            break

          default:
            this.errorMessage.set('Something went wrong')  
        }
          
          return of([])
        })
      )
})
  )

  loadProducts = (type: string | null, sort: string | null, minDamage: number | null) =>{
    let params = new HttpParams()
    if  (type !== null)      params = params.set('type', type)
    if  (sort !== null)      params = params.set('sort', sort)
    if  (minDamage !== null) params = params.set('min_damage', String(minDamage))
    
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer my-token')
      .set('Accept-Language', 'en')

    this.isLoading.set(true)
    this.errorMessage.set('')

    this.http.get<Weapon[]>('http://127.0.0.1:8000/api/weapons',{ params, headers})
    .pipe(
      catchError(error =>{
        console.log(error);
        this.errorMessage.set('Failed to load weapons')

        return throwError(() => error)
      }),
      finalize(() =>{
        this.isLoading.set(false)
      })
    )
    .subscribe({
      next: response =>{
        console.log(response);
        console.log(response.length);
        this.products.set(response)
      },
      error: error =>{
        console.log("Final error:", error);
      }
    })
  }

  addWeapon = (weapon: Weapon) =>{
      this.isLoading.set(true)
      this.errorMessage.set('')
    this.http.post<Weapon>('http://127.0.0.1:8000/api/weapons',weapon)
    .pipe(
      catchError(error =>{
        console.log(error);
        this.errorMessage.set('Failed to load weapons')

        return throwError(() => error)
      }),
      finalize(() =>{
        this.isLoading.set(false)
      })
    )
    .subscribe({
      next: response =>{
        console.log(response);
      this.products.update(products =>[
         ...products,
        response
      ])},
      
      error: error =>{
        console.log("Final error:", error);
      }
     
    })
  }

  deleteWeapon = (id: number) =>{
    this.isLoading.set(true)
    this.http.delete<void>(`http://127.0.0.1:8000/api/weapons/${id}`)
    .pipe(
      catchError(error =>{
        console.log(error);
        this.errorMessage.set('Failed to load weapons')

        return throwError(() => error)
      }),
      finalize(() =>{
        this.isLoading.set(false)
      })
    )
    .subscribe({
      next: response =>{
         console.log(response);
      this.products.update(products =>
        products.filter(product => product.id !== id)
    )},
      error: error =>{
        console.log("Final error:", error);
      }
    })
      
  }

  updateWeapon = (id: number, weapon: Weapon, headers: HttpHeaders) =>{
      this.isLoading.set(true)
      this.errorMessage.set('')
    this.http.patch<Weapon>(`http://127.0.0.1:8000/api/weapons/${id}`,weapon, {headers})
    .pipe(
      finalize(() =>{
        this.isLoading.set(false)
      })
    )
    .subscribe({
      next: response => {
      console.log(response);
      this.products.update(products =>
        products.map(product => product.id === id ? response : product))
    },
      error: (error: HttpErrorResponse) => {
        console.log(error.status);
        switch(error.status){
          case 400:
            this.errorMessage.set('Invalid weapon data')
            break

          case 404:
            this.errorMessage.set('Weapon not found')
            break

          case 500:
            this.errorMessage.set('Server error')
            break

          default:
            this.errorMessage.set('Something went wrong')  
        }
      }
  })  
  }
}
 