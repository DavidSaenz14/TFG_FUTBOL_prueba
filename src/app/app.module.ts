import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';  // <-- Importa HTTP_INTERCEPTORS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

import { EquiposComponent } from './components/equipos/equipos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { CompeticionComponent } from './components/competicion/competicion.component';
import { ArbitrosComponent } from './components/arbitros/arbitros.component';
import { EstadiosComponent } from './components/estadios/estadios.component';
import { PartidoComponent } from './components/partido/partido.component';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ClasificacionComponent } from './components/clasificacion/clasificacion.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

// Importa el interceptor que creaste
import { JwtInterceptor } from './services/jwt.interceptor';  // Ajusta la ruta según donde lo tengas
import { Router } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EquiposComponent,
    JugadoresComponent,
    CompeticionComponent,
    ArbitrosComponent,
    EstadiosComponent,
    PartidoComponent,
    LoginComponent,
    UserDashboardComponent,
    UnauthorizedComponent,
    RegisterComponent,
    HomeComponent,
    ClasificacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private route : Router){}
  navToEquipos(){
     this.route.navigate(['/equipos'])
  }
}
