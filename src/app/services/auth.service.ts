import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') ?? 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('/usuarios/login', { username, password }) // Asume que '/usuarios/login' es la ruta correcta en tu API
      .pipe(
        tap(user => {
          // Almacenar detalles del usuario y token jwt en local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('Login error', error);
          return of(null); // Devuelve un observable con un valor null en caso de error
        })
      );
  }

  logout() {
    // Eliminar usuario de local storage y establecer current user a null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  registerUser(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>('/usuarios/register', { username, email, password }) // Asume que '/usuarios/register' es la ruta correcta en tu API
      .pipe(
        tap(user => {
          // Almacenar detalles del usuario registrado en local storage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }),
        catchError(error => {
          console.error('Registration error', error);
          return of(null); // Devuelve un observable con un valor null en caso de error
        })
      );
  }

  // Método para verificar si el usuario actual es administrador
  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user && user.role === 'admin';
  }
}
