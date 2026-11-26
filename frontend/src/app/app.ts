import { Component, signal, effect, inject } from '@angular/core';
import { Layout } from './layout/layout';
import { RouterOutlet } from '@angular/router';
import { computed } from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { ProductsService } from './product-card/products';
import { Weapon } from './weapons/weapon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Layout, RouterOutlet,ProductCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('Game Nexus');

  public productsService = inject(ProductsService)

  constructor(){
    //this.productsService.loadProducts()
    this.productsService.deleteWeapon(60)
  }

}
/*
interface Weapon{
  id: number;
  name: string;
  damage: number;
  range: number;
  weight: number;
}


type Dog = { type: 'dog'; bark: () => void }
type Cat = { type: 'cat'; meow: () => void }

type Animal = Dog | Cat

const makeSound = (animal: Animal): void =>{
  if(animal.type === 'cat') animal.meow()
  else if(animal.type === 'dog') animal.bark()
}

const cat: Animal = {type: 'cat', meow: () => {console.log('Meow!');
}}

makeSound(cat)

//Задача 2
type Admin = { name: string; role: string }
type User = { name: string; email: string }

type Person = Admin | User

const person1: Person = { name: 'Ben', email: 'email@.com' }
const person2: Person = { name: 'John', role: 'Admin'}

const getInfo = (person: Person): string | undefined =>{
  if('email' in person) return `User: ${person.email}`
  else return `Admin: ${person.name}`
}

console.log(getInfo(person1));
console.log(getInfo(person2));

type Car = { type: 'car'; speed: number }
type Plane = { type: 'plane'; flySpeed: number }

type Transport = Car | Plane

const isPlane = (t: any): t is Plane =>{
  return 'flySpeed' in t
} 

const car1: Car = { type: 'car',speed: 200}
const plane1: Plane = { type: 'plane', flySpeed: 1000}

const getSpeed = (t: Transport): number =>{
  if(isPlane(t)) return t.flySpeed
  else return t.speed
}

console.log(getSpeed(plane1));

*/
