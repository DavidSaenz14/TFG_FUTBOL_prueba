import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clasificacion',
  templateUrl: './clasificacion.component.html',
  styleUrls: ['./clasificacion.component.css']
})
export class ClasificacionComponent implements OnInit {
  clasificacionesEquipos: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllClasificacionesEquipos();
  }

  private handleRequest<T>(observable: Observable<T>, successMessage?: string) {
    observable.subscribe(
      (data: any) => {
        if (successMessage) {
          console.log(successMessage, data);
        }
        this.clasificacionesEquipos = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getClasificacion(id: number) {
    this.handleRequest(
      this.apiService.getClasificacion(id),
      'Clasificación de equipo obtenida:'
    );
  }

  getAllClasificacionesEquipos() {
    this.handleRequest(
      this.apiService.getAllClasificacionesEquipos(),
      'Todas las clasificaciones de equipos obtenidas:'
    );
  }

  createClasificacionEquipo(clasificacionEquipo: any) {
    this.handleRequest(
      this.apiService.createClasificacionEquipo(clasificacionEquipo),
      'Clasificación de equipo creada:'
    );
  }

  updateClasificacionEquipo(id: number, clasificacionEquipo: any) {
    this.handleRequest(
      this.apiService.updateClasificacionEquipo(id, clasificacionEquipo),
      'Clasificación de equipo actualizada:'
    );
  }

  deleteClasificacionEquipo(id: number) {
    this.handleRequest(
      this.apiService.deleteClasificacionEquipo(id),
      'Clasificación de equipo eliminada'
    );
  }
}
