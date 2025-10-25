import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders(includeJson: boolean = false): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (includeJson) {
      headers = headers.set('Content-Type', 'application/json');
    }
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // -------------------- Equipos --------------------
  getEquipos(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/equipos`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  getEquipo(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/equipos/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  createEquipo(equipo: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/equipos`, equipo, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  updateEquipo(id: number, equipo: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/equipos/${id}`, equipo, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  deleteEquipo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/equipos/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  // -------------------- Jugadores --------------------
  getJugadores(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/jugadores`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  getJugador(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/jugadores/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  createJugador(jugador: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/jugadores`, jugador, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  updateJugador(id: number, jugador: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/jugadores/${id}`, jugador, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  deleteJugador(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/jugadores/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  // -------------------- Competiciones --------------------
  getCompeticiones(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/competiciones`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  // -------------------- Árbitros --------------------
  getArbitros(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/arbitros`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  createArbitro(arbitro: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/arbitros`, arbitro, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  updateArbitro(id: number, arbitro: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/arbitros/${id}`, arbitro, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  deleteArbitro(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/arbitros/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  // -------------------- Estadios --------------------
  getEstadios(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/estadios`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  // -------------------- Clasificación --------------------
  getClasificacion(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/clasificacion/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  getAllClasificacionesEquipos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiURL}/clasificacion`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  createClasificacionEquipo(clasificacionEquipo: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/clasificacion`, clasificacionEquipo, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  updateClasificacionEquipo(id: number, clasificacionEquipo: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/clasificacion/${id}`, clasificacionEquipo, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  deleteClasificacionEquipo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/clasificacion/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  // -------------------- Partidos --------------------
  getPartidos(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/partidos`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  createPartido(partido: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/partidos`, partido, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  updatePartido(id: number, partido: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/partidos/${id}`, partido, { headers: this.getAuthHeaders(true) })
      .pipe(catchError(this.errorHandler));
  }

  deletePartido(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/partidos/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.errorHandler));
  }

  // -------------------- Manejo de errores --------------------
  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
