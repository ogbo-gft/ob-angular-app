import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableComponent } from './table-component/table-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TableComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('ob-app');
}
