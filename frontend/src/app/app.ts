import { Component, signal, effect, inject } from '@angular/core';
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
  protected readonly title = signal('Game Nexus');

}
