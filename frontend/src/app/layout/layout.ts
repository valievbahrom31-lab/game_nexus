import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-layout',
  imports: [Footer,Header,RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  
}
 
 