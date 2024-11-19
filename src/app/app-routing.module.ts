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

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { 
    path: 'dashboard', 
    children: [
      { path: 'admin', component: AdminDashboardComponent },
      { path: 'user', component: UserDashboardComponent }
    ] 
  },
  { path: 'equipos', component: EquiposComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'competiciones', component: CompeticionComponent },
  { path: 'clasificacion', component: ClasificacionComponent },
  { path: 'arbitros', component: ArbitrosComponent },
  { path: 'estadios', component: EstadiosComponent },
  { path: 'partidos', component: PartidoComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }