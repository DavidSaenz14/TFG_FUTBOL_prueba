import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TFG_FUTBOL';

  constructor(private router: Router) {}

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

  navigateToClasificacion() { // Consistent naming with path
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