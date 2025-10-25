import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface Competicion {
  id: number;
  nombre: string;
}

interface EquipoBackend {
  id: number;
  nombre: string;
  liga: string;
  entrenador: string;
  fundacionYear: number;
  estadio: string;
  competicion?: { id: number; nombre?: string };
}

interface Equipo {
  id: number;
  nombre: string;
  liga: string;
  entrenador: string;
  fundacionYear: number;
  estadio: string;
  competicionId: number;
  nombreCompeticion: string;
  editing: boolean;
}

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {
  equipos: Equipo[] = [];
  competiciones: Competicion[] = [];
  mostrarFormulario: boolean = false;
  newEquipo: Equipo = this.getEquipoVacio();
  isAdmin: boolean = true; // Cambiar según tu lógica real de auth

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getCompeticiones();
  }

  // --- Métodos públicos para template ---
  public getNombreCompeticionById(id: number): string {
    const comp = this.competiciones.find(c => c.id === id);
    return comp ? comp.nombre : '';
  }

  public createEquipo(): void {
    if (!this.isAdmin) return;

    this.newEquipo.nombreCompeticion = this.getNombreCompeticionById(this.newEquipo.competicionId);

    const equipoToSend = { ...this.newEquipo, competicion: { id: this.newEquipo.competicionId } };

    this.apiService.createEquipo(equipoToSend).subscribe(
      (equipo: EquipoBackend) => {
        this.equipos.push(this.mapEquipo(equipo));
        this.resetNewEquipo();
      },
      error => console.error('Error al crear equipo:', error)
    );
  }

  public updateEquipo(equipo: Equipo): void {
    if (!this.isAdmin) return;

    equipo.nombreCompeticion = this.getNombreCompeticionById(equipo.competicionId);

    const equipoToSend = {
      id: equipo.id,
      nombre: equipo.nombre,
      liga: equipo.liga,
      entrenador: equipo.entrenador,
      fundacionYear: equipo.fundacionYear,
      estadio: equipo.estadio,
      competicion: { id: equipo.competicionId }
    };

    this.apiService.updateEquipo(equipo.id, equipoToSend).subscribe(
      (updated: EquipoBackend) => {
        const index = this.equipos.findIndex(e => e.id === updated.id);
        if (index !== -1) {
          this.equipos[index] = this.mapEquipo(updated);
        }
      },
      error => console.error('Error al actualizar equipo:', error)
    );
  }

  public deleteEquipo(id: number): void {
    if (!this.isAdmin) return;

    this.apiService.deleteEquipo(id).subscribe(
      () => this.equipos = this.equipos.filter(e => e.id !== id),
      error => console.error('Error al eliminar equipo:', error)
    );
  }

  public cancelEdit(equipo: Equipo): void {
    equipo.editing = false;
  }

  // --- Métodos privados ---
  private getCompeticiones(): void {
    this.apiService.getCompeticiones().subscribe(
      (data: Competicion[]) => {
        this.competiciones = data;
        this.getEquipos();
      },
      error => console.error('Error al obtener competiciones:', error)
    );
  }

  private getEquipos(): void {
    this.apiService.getEquipos().subscribe(
      (data: EquipoBackend[]) => {
        this.equipos = data.map(e => this.mapEquipo(e));
      },
      error => console.error('Error al obtener equipos:', error)
    );
  }

  private mapEquipo(e: EquipoBackend): Equipo {
    const competicionId = e.competicion?.id || 0;
    const nombreCompeticion = e.competicion?.nombre || this.getNombreCompeticionById(competicionId);
    return {
      id: e.id,
      nombre: e.nombre,
      liga: e.liga,
      entrenador: e.entrenador,
      fundacionYear: e.fundacionYear,
      estadio: e.estadio,
      competicionId,
      nombreCompeticion,
      editing: false
    };
  }

  private resetNewEquipo(): void {
    this.newEquipo = this.getEquipoVacio();
    this.mostrarFormulario = false;
  }

  private getEquipoVacio(): Equipo {
    return {
      id: 0,
      nombre: '',
      liga: '',
      entrenador: '',
      fundacionYear: 0,
      estadio: '',
      competicionId: 0,
      nombreCompeticion: '',
      editing: false
    };
  }
}
