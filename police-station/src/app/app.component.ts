import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PsListComponent } from './components/ps-list/ps-list.component';

@Component({
  selector: 'app-root',
  imports: [PsListComponent,RouterOutlet,RouterModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  title = 'police-station';
}
