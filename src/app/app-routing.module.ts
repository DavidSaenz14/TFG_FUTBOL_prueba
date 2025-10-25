import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

import { EquiposComponent } from './components/equipos/equipos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { CompeticionComponent } from './components/competicion/competicion.component';
import { ArbitrosComponent } from './components/arbitros/arbitros.component';
import { EstadiosComponent } from './components/estadios/estadios.component';
import { PartidoComponent } from './components/partido/partido.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }  // Rol en mayúsculas para coincidir con backend
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['USER', 'ADMIN'] }
  },

  {
    path: 'equipos',
    component: EquiposComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'jugadores',
    component: JugadoresComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },

  // Puedes ajustar roles permitidos según lo que necesites
  {
    path: 'partidos',
    component: PartidoComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ADMIN'] }
  },

  // Rutas públicas sin protección
  { path: 'competiciones', component: CompeticionComponent },
  { path: 'clasificacion', component: ClasificacionComponent },
  { path: 'arbitros', component: ArbitrosComponent },
  { path: 'estadios', component: EstadiosComponent },

  // Ruta fallback para URLs no encontradas
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
