import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://springboot-4-r9wa.onrender.com/auth'; // Ahora apunta a /auth

  constructor(private http: HttpClient) { }

  // ✅ Verificar si un usuario ya existe
  checkUserExists(username: string, email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check`, {
      params: { username, email }
    });
  }

  // ✅ Registrar un nuevo usuario
  registerUser(username: string, email: string, password: string, role: string = 'user'): Observable<any> {
    const user = {
      nombre: username,
      correoElectronico: email,
      contrasena: password,
      rol: role
    };
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // ✅ Métodos para administradores (opcional)
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuarios/${id}`);
  }
}
