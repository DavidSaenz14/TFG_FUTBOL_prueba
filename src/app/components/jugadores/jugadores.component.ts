import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface Equipo {
  id: number;
  nombre: string;
}

interface JugadorBackend {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  nacionalidad: string;
  altura: number;
  peso: number;
  equipo?: { id: number; nombre?: string } | null;
}

interface Jugador {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  nacionalidad: string;
  altura: number;
  peso: number;
  equipoId: number | null;
  nombreEquipo: string;
  editing: boolean;
}

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})
export class JugadoresComponent implements OnInit {
  jugadores: Jugador[] = [];
  equipos: Equipo[] = [];
  mostrarFormulario: boolean = false;

  newJugador: Jugador = this.getJugadorVacio();
  isAdmin: boolean = true; // Reemplazar con lógica real de autenticación

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getEquipos();
  }

  // --- Métodos públicos ---
  public getNombreEquipoById(id: number | null): string {
    if (id === null) return 'Sin equipo';
    const equipo = this.equipos.find(e => e.id === id);
    return equipo ? equipo.nombre : 'Sin equipo';
  }

  public createJugador(): void {
    if (!this.isAdmin) return;

    const jugadorToSend = { ...this.newJugador, equipo: this.newJugador.equipoId ? { id: this.newJugador.equipoId } : null };

    this.apiService.createJugador(jugadorToSend).subscribe(
      (jugador: JugadorBackend) => {
        this.jugadores.push(this.mapJugador(jugador));
        this.resetNewJugador();
      },
      error => console.error('Error al crear jugador:', error)
    );
  }

  public updateJugador(jugador: Jugador): void {
    if (!this.isAdmin) return;

    const jugadorToSend = {
      id: jugador.id,
      nombre: jugador.nombre,
      edad: jugador.edad,
      posicion: jugador.posicion,
      nacionalidad: jugador.nacionalidad,
      altura: jugador.altura,
      peso: jugador.peso,
      equipo: jugador.equipoId ? { id: jugador.equipoId } : null
    };

    this.apiService.updateJugador(jugador.id, jugadorToSend).subscribe(
      (updated: JugadorBackend) => {
        const index = this.jugadores.findIndex(j => j.id === updated.id);
        if (index !== -1) {
          this.jugadores[index] = this.mapJugador(updated);
        }
      },
      error => console.error('Error al actualizar jugador:', error)
    );
  }

  public deleteJugador(id: number): void {
    if (!this.isAdmin) return;

    this.apiService.deleteJugador(id).subscribe(
      () => this.jugadores = this.jugadores.filter(j => j.id !== id),
      error => console.error('Error al eliminar jugador:', error)
    );
  }

  public cancelEdit(jugador: Jugador): void {
    jugador.editing = false;
  }

  // --- Métodos privados ---
  private getEquipos(): void {
    this.apiService.getEquipos().subscribe(
      (data: Equipo[]) => {
        this.equipos = data;
        this.getJugadores();
      },
      error => console.error('Error al obtener equipos:', error)
    );
  }

  private getJugadores(): void {
    this.apiService.getJugadores().subscribe(
      (data: JugadorBackend[]) => {
        this.jugadores = data.map(j => this.mapJugador(j));
      },
      error => console.error('Error al obtener jugadores:', error)
    );
  }

  private mapJugador(j: JugadorBackend): Jugador {
    const equipoId = j.equipo?.id ?? null;
    const nombreEquipo = j.equipo?.nombre ?? this.getNombreEquipoById(equipoId);

    return {
      id: j.id,
      nombre: j.nombre,
      edad: j.edad,
      posicion: j.posicion,
      nacionalidad: j.nacionalidad,
      altura: j.altura,
      peso: j.peso,
      equipoId,
      nombreEquipo,
      editing: false
    };
  }

  private resetNewJugador(): void {
    this.newJugador = this.getJugadorVacio();
    this.mostrarFormulario = false;
  }

  private getJugadorVacio(): Jugador {
    return {
      id: 0,
      nombre: '',
      edad: 0,
      posicion: '',
      nacionalidad: '',
      altura: 0,
      peso: 0,
      equipoId: null,
      nombreEquipo: '',
      editing: false
    };
  }
}
