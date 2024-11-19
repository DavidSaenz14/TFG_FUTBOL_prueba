import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipos: any[] = [];
  newEquipo: any = {}; // Objeto para almacenar los datos del nuevo equipo

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadEquipos();
  }

  loadEquipos(): void {
    this.apiService.getEquipos().subscribe(
      data => {
        this.equipos = data.map((equipo: any) => ({ ...equipo, editing: false })); // Añadir propiedad 'editing' a cada equipo
      },
      error => {
        console.error('Error al cargar equipos:', error);
      }
    );
  }

  createEquipo(): void {
    this.apiService.createEquipo(this.newEquipo).subscribe(
      () => {
        console.log('Equipo creado correctamente');
        this.loadEquipos(); // Recargar la lista de equipos después de crear uno nuevo
        this.newEquipo = {}; // Limpiar los datos del nuevo equipo
      },
      error => {
        console.error('Error al crear equipo:', error);
      }
    );
  }

  updateEquipo(equipo: any): void {
    this.apiService.updateEquipo(equipo.id, equipo).subscribe(
      () => {
        console.log('Equipo actualizado correctamente');
        equipo.editing = false; // Finalizar la edición del equipo
        this.loadEquipos(); // Recargar la lista de equipos después de actualizar uno
      },
      error => {
        console.error('Error al actualizar equipo:', error);
      }
    );
  }

  deleteEquipo(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este equipo?')) {
      this.apiService.deleteEquipo(id).subscribe(
        () => {
          console.log('Equipo eliminado correctamente');
          this.loadEquipos(); // Recargar la lista de equipos después de eliminar uno
        },
        error => {
          console.error('Error al eliminar equipo:', error);
        }
      );
    }
  }

  editingEquipo(equipo: any): void {
    equipo.editing = true; // Activar modo edición para el equipo seleccionado
  }
}
