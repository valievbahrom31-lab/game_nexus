import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { WeaponsComponent } from '../weapons/weapons.component';
import { Header } from '../header/header';

@Component({
  selector: 'app-layout',
  imports: [Footer,Header,RouterOutlet,WeaponsComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  
}
 
 