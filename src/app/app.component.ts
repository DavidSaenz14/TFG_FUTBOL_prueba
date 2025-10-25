import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';  // Ajusta ruta si es necesario
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TFG_FUTBOL';
  isLoggedIn = false;
  private authSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToAdminDashboard() {
    this.router.navigate(['/admin-dashboard']);
  }

  navigateToUserDashboard() {
    this.router.navigate(['/user-dashboard']);
  }

  navigateToEquipos() {
    this.router.navigate(['/equipos']);
  }

  navigateToJugadores() {
    this.router.navigate(['/jugadores']);
  }

  navigateToCompeticiones() {
    this.router.navigate(['/competiciones']);
  }

  navigateToArbitros() {
    this.router.navigate(['/arbitros']);
  }

  navigateToClasificacion() {
    this.router.navigate(['/clasificacion']);
  }

  navigateToEstadios() {
    this.router.navigate(['/estadios']);
  }

  navigateToAlineaciones() {
    this.router.navigate(['/alineaciones']);
  }

  navigateToPartidos() {
    this.router.navigate(['/partidos']);
  }
}
