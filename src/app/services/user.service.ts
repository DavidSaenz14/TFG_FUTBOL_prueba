import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model'; // Asume que tienes un modelo User definido

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/usuarios'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkUserExists(username: string, email: string): Observable<boolean> {
    return this.getAllUsers().pipe(
      map(users => users.some(user => user.username === username || user.email === email))
    );
  }

  registerUser(username: string, email: string, password: string): Observable<any> {
    const user = { username, email, password, role: 'ROLE_USER' }; // Ajusta según sea necesario
    return this.createUser(user);
  }
}
