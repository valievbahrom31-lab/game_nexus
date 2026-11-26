import { Component, input, output } from '@angular/core';
import { App } from '../app';
import { Weapon } from '../weapons/weapon';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Weapon>()

  deleteProduct = output<number>()
  
}

