import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp?: number;
  rol?: string;
  role?: string;
  [key: string]: any;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'jwt_token';

  private currentUserSubject: BehaviorSubject<DecodedToken | null>;
  public currentUser: Observable<DecodedToken | null>;

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem(this.tokenKey);
    const decoded = token ? this.decodeToken(token) : null;
    this.currentUserSubject = new BehaviorSubject<DecodedToken | null>(decoded);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): DecodedToken | null {
    return this.currentUserSubject.value;
  }

  login(correoElectronico: string, contraseña: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('https://springboot-4-r9wa.onrender.com/auth/login', { correoElectronico, contraseña }).pipe(
      tap(response => {
        if (response?.token) {
          this.setToken(response.token);
        }
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(() => error);
      })
    );
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    const decoded = this.decodeToken(token);
    this.currentUserSubject.next(decoded);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded?.exp) return false;

    const now = Date.now() / 1000;
    return decoded.exp > now;
  }

  isAdmin(): boolean {
    const decoded = this.currentUserValue;
    if (!decoded) return false;

    const userRole = (decoded.rol || decoded.role || '').toLowerCase();
    return userRole === 'admin' || userRole === 'ROLE_ADMIN';
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error('Token inválido', e);
      return null;
    }
  }
}
