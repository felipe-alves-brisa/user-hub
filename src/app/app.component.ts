import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private router: Router) {}

  menuItems = [
    {
      title: 'Início',
      icon: 'home',
      action: () => this.router.navigate(['/'])
    },
    {
      title: 'Usuários',
      icon: 'user',
      action: () => this.router.navigate(['/users'])
    }
  ];
}