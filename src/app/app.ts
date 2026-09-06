import { Component, signal } from '@angular/core';
import { Layout } from './layout/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Layout, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('my-app');
}

interface Weapon{
  id: number;
  name: string;
  damage: number;
  range: number;
  weight: number;
}

const weapons: Weapon[] = [
  
  { id: 1, name: 'AK-47', damage: 50, range: 300, weight: 4.5 },
  { id: 2, name: 'M4A1', damage: 30, range: 250, weight: 4.0 },
  { id: 3, name: 'AWP', damage: 100, range: 1000, weight: 7.5 },
  { id: 4, name: 'SCAR', damage: 45, range: 400, weight: 4.2 },
  { id: 5, name: 'G36', damage: 40, range: 350, weight: 4.1 },
  { id: 6, name: 'FAMAS', damage: 32, range: 280, weight: 3.8 },
  { id: 7, name: 'AUG', damage: 38, range: 320, weight: 4.0 },
  { id: 8, name: 'MP5', damage: 25, range: 180, weight: 3.1 },
  { id: 9, name: 'UMP45', damage: 35, range: 200, weight: 3.4 },
  { id: 10, name: 'P90', damage: 28, range: 220, weight: 3.0 },
  { id: 11, name: 'Desert Eagle', damage: 70, range: 150, weight: 2.0 },
  { id: 12, name: 'Glock 17', damage: 20, range: 120, weight: 1.2 },
  { id: 13, name: 'USP-S', damage: 25, range: 140, weight: 1.3 },
  { id: 14, name: 'M249', damage: 55, range: 500, weight: 7.8 },
  { id: 15, name: 'PKM', damage: 60, range: 600, weight: 8.2 },
  { id: 16, name: 'Dragunov', damage: 90, range: 900, weight: 6.5 },
  { id: 17, name: 'Barrett M82', damage: 120, range: 1500, weight: 13.5 },
  { id: 18, name: 'SPAS-12', damage: 80, range: 80, weight: 4.4 },
  { id: 19, name: 'Benelli M4', damage: 75, range: 90, weight: 3.9 },
  { id: 20, name: 'Vector', damage: 33, range: 210, weight: 2.7 }
 
]

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

