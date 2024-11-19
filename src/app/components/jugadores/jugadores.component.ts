import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface Equipo {
  id: number;
  nombre: string;
}
// Define una interfaz para representar la estructura de los datos de los jugadores
interface Jugador {
  id: number;
  nombre: string;
  edad: number;
  posicion: string;
  nacionalidad: string;
  altura: number;
  peso: number;
  equipo: Equipo; // Añadido equipo
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
  editingJugador: Jugador | null = null;
  newJugador: Jugador = {
    id: 0,
    nombre: '',
    edad: 0,
    posicion: '',
    nacionalidad: '',
    altura: 0,
    peso: 0,
    equipo: { id: 0, nombre: '' }, // Inicializa equipo vacío
    editing: false
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getJugadores();
  }

  getJugadores(): void {
    this.apiService.getJugadores().subscribe(
      (data: Jugador[]) => {
        this.jugadores = data.map(jugador => ({ ...jugador, editing: false }));
      },
      (error) => {
        console.error('Error al obtener los jugadores:', error);
      }
    );
  }

  createJugador(): void {
    this.apiService.createJugador(this.newJugador).subscribe(
      (jugador: Jugador) => {
        this.jugadores.push({ ...jugador, editing: false });
        this.newJugador = {
          id: 0,
          nombre: '',
          edad: 0,
          posicion: '',
          nacionalidad: '',
          altura: 0,
          peso: 0,
          equipo: { id: 0, nombre: '' }, // Inicializa equipo vacío
          editing: false
        };
      },
      (error) => {
        console.error('Error al crear el jugador:', error);
      }
    );
  }
  

  updateJugador(jugador: Jugador): void {
    this.apiService.updateJugador(jugador.id, jugador).subscribe(
      (updatedJugador: Jugador) => {
        const index = this.jugadores.findIndex(j => j.id === updatedJugador.id);
        if (index !== -1) {
          this.jugadores[index] = { ...updatedJugador, editing: false };
        }
      },
      (error) => {
        console.error('Error al actualizar el jugador:', error);
      }
    );
  }

  deleteJugador(id: number): void {
    this.apiService.deleteJugador(id).subscribe(
      () => {
        this.jugadores = this.jugadores.filter(j => j.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el jugador:', error);
      }
    );
  }

  editJugador(jugador: Jugador): void {
    jugador.editing = true;
    this.editingJugador = { ...jugador };
  }

  cancelEdit(jugador: Jugador): void {
    jugador.editing = false;
    this.editingJugador = null;
  }
}
