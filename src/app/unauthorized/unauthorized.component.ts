import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {

  constructor(private router: Router) {}

  logout() {
    // Borra el token localmente para "deslogear"
    localStorage.removeItem('jwt_token');

    // Redirige al login
    this.router.navigate(['/login']);
  }
}
