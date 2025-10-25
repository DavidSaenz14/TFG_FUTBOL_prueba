import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styleUrls: ['./competicion.component.css']
})
export class CompeticionComponent implements OnInit {
  competiciones: any[] = [];
  // Para guardar el equipo seleccionado por cada competición (opcional)
  equiposSeleccionados: { [competicionId: number]: string } = {};

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCompeticiones();
  }

  getCompeticiones() {
    this.apiService.getCompeticiones().subscribe({
      next: (data: any[]) => {
        this.competiciones = data.map(comp => {
          const nombresEquipos = comp.equipos?.map((eq: any) => eq.nombre) || [];
          // Inicializamos el primer equipo como seleccionado por defecto
          if (nombresEquipos.length > 0) {
            this.equiposSeleccionados[comp.id] = nombresEquipos[0];
          }
          return {
            ...comp,
            nombresEquipos
          };
        });
      },
      error: (err) => {
        console.error('Error cargando competiciones:', err);
      }
    });
  }

  // Método opcional si quieres reaccionar al cambio del dropdown
  onEquipoChange(competicionId: number, nuevoEquipo: string) {
    this.equiposSeleccionados[competicionId] = nuevoEquipo;
    console.log(`Competición ${competicionId} seleccionó equipo: ${nuevoEquipo}`);
  }
}
