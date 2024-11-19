import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = 'http://localhost:8080'; // Cambia la URL base según tu configuración

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  // Métodos para los equipos

  getEquipos(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/equipos`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getEquipo(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/equipos/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createEquipo(equipo: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/equipos`, equipo, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateEquipo(id: number, equipo: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/equipos/${id}`, equipo, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteEquipo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/equipos/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Métodos para los jugadores

  getJugadores(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/jugadores`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getJugador(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/jugadores/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createJugador(jugador: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/jugadores`, jugador, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateJugador(id: number, jugador: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/jugadores/${id}`, jugador, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteJugador(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/jugadores/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Métodos para las competiciones

  getCompeticiones(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/competiciones`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Métodos para los árbitros

  getArbitros(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/arbitros`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createArbitro(arbitro: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiURL}/arbitros`, arbitro, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateArbitro(id: number, arbitro: any): Observable<any> {
    return this.httpClient.put<any>(`${this.apiURL}/arbitros/${id}`, arbitro, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  deleteArbitro(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiURL}/arbitros/${id}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // Métodos para los estadios

  getEstadios(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/estadios`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getClasificacion(id: number): Observable<any> {
    const url = `${this.apiURL}/clasificacion/${id}`;
    return this.httpClient.get<any>(url).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllClasificacionesEquipos(): Observable<any[]> {
    const url = `${this.apiURL}/clasificacion`;
    return this.httpClient.get<any[]>(url).pipe(
      catchError(this.errorHandler)
    );
  }

  createClasificacionEquipo(clasificacionEquipo: any): Observable<any> {
    const url = `${this.apiURL}/clasificacion`;
    return this.httpClient.post<any>(url, clasificacionEquipo, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  updateClasificacionEquipo(id: number, clasificacionEquipo: any): Observable<any> {
    const url = `${this.apiURL}/clasificacion/${id}`;
    return this.httpClient.put<any>(url, clasificacionEquipo, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteClasificacionEquipo(id: number): Observable<void> {
    const url = `${this.apiURL}/clasificacion/${id}`;
    return this.httpClient.delete<void>(url, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
// Métodos para los partidos

getPartidos(): Observable<any> {
  return this.httpClient.get<any>(`${this.apiURL}/partidos`)
    .pipe(
      catchError(this.errorHandler)
    );
}

createPartido(partido: any): Observable<any> {
  return this.httpClient.post<any>(`${this.apiURL}/partidos`, partido, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
}

updatePartido(id: number, partido: any): Observable<any> {
  return this.httpClient.put<any>(`${this.apiURL}/partidos/${id}`, partido, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
}

deletePartido(id: number): Observable<void> {
  return this.httpClient.delete<void>(`${this.apiURL}/partidos/${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
}

errorHandler(error: HttpErrorResponse) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Error del lado del cliente
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // Error del lado del servidor
    errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}
}

