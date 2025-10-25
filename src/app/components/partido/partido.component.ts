import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

interface Equipo { id: number; nombre: string; }
interface Estadio { id: number; nombre: string; }
interface Arbitro { id: number; nombre: string; }
interface Competicion { id: number; nombre: string; }

interface PartidoFrontend {
  id?: number;
  golesLocal: number;
  golesVisitante: number;
  fechaHora: string;

  // Objetos completos
  equipoLocal: Equipo;
  equipoVisitante: Equipo;
  estadio: Estadio;
  arbitroPrincipal: Arbitro;
  competicion?: Competicion;

  // Nombres planos para la plantilla
  nombreEquipoLocal: string;
  nombreEquipoVisitante: string;
  nombreEstadio: string;
  nombreArbitro: string;
  nombreCompeticion: string;
}

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  partidos: PartidoFrontend[] = [];
  equipos: Equipo[] = [];
  estadios: Estadio[] = [];
  arbitros: Arbitro[] = [];
  competiciones: Competicion[] = [];

  currentPartido: PartidoFrontend = this.getPartidoVacio();
  editingPartido = false;
  mostrarFormulario = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEquipos();
    this.loadEstadios();
    this.loadArbitros();
    this.loadCompeticiones();
    this.loadPartidos();
  }

  // --- Cargar datos ---
  loadEquipos() { this.apiService.getEquipos().subscribe(data => this.equipos = data); }
  loadEstadios() { this.apiService.getEstadios().subscribe(data => this.estadios = data); }
  loadArbitros() { this.apiService.getArbitros().subscribe(data => this.arbitros = data); }
  loadCompeticiones() { this.apiService.getCompeticiones().subscribe(data => this.competiciones = data); }

  loadPartidos(): void {
    this.apiService.getPartidos().subscribe((data: any[]) => {
      this.partidos = data.map(p => this.mapPartido(p));
    });
  }

  private mapPartido(p: any): PartidoFrontend {
    return {
      id: p.id,
      golesLocal: p.golesLocal,
      golesVisitante: p.golesVisitante,
      fechaHora: p.fechaHora,
      equipoLocal: p.equipoLocal || { id: 0, nombre: '' },
      equipoVisitante: p.equipoVisitante || { id: 0, nombre: '' },
      estadio: p.estadio || { id: 0, nombre: '' },
      arbitroPrincipal: p.arbitroPrincipal || { id: 0, nombre: '' },
      competicion: p.competicion || { id: 0, nombre: '' },
      nombreEquipoLocal: p.equipoLocal?.nombre || '',
      nombreEquipoVisitante: p.equipoVisitante?.nombre || '',
      nombreEstadio: p.estadio?.nombre || '',
      nombreArbitro: p.arbitroPrincipal?.nombre || '',
      nombreCompeticion: p.competicion?.nombre || ''
    };
  }

  // --- CRUD ---
  addNewPartido(): void {
    this.currentPartido = this.getPartidoVacio();
    this.editingPartido = false;
    this.mostrarFormulario = true;
  }

  editPartido(p: PartidoFrontend): void {
    this.currentPartido = { ...p };
    this.editingPartido = true;
    this.mostrarFormulario = true;
  }

  createPartido(): void {
    const partidoAEnviar = this.mapToBackend(this.currentPartido);
    this.apiService.createPartido(partidoAEnviar).subscribe((resp: any) => {
      const nuevoPartido = { ...this.currentPartido, id: resp.id };
      this.partidos.push(nuevoPartido);
      this.resetForm();
    });
  }

  updatePartido(): void {
    if (!this.currentPartido.id) return;
    const partidoAEnviar = this.mapToBackend(this.currentPartido);
    this.apiService.updatePartido(this.currentPartido.id, partidoAEnviar).subscribe(() => {
      const index = this.partidos.findIndex(p => p.id === this.currentPartido.id);
      if (index !== -1) this.partidos[index] = { ...this.currentPartido };
      this.resetForm();
    });
  }

  deletePartido(id: number): void {
    this.apiService.deletePartido(id).subscribe(() => {
      this.partidos = this.partidos.filter(p => p.id !== id);
    });
  }

  cancel(): void { this.resetForm(); }

  private resetForm(): void {
    this.currentPartido = this.getPartidoVacio();
    this.editingPartido = false;
    this.mostrarFormulario = false;
  }

  private getPartidoVacio(): PartidoFrontend {
    return {
      golesLocal: 0,
      golesVisitante: 0,
      fechaHora: '',
      equipoLocal: { id: 0, nombre: '' },
      equipoVisitante: { id: 0, nombre: '' },
      estadio: { id: 0, nombre: '' },
      arbitroPrincipal: { id: 0, nombre: '' },
      competicion: { id: 0, nombre: '' },
      nombreEquipoLocal: '',
      nombreEquipoVisitante: '',
      nombreEstadio: '',
      nombreArbitro: '',
      nombreCompeticion: ''
    };
  }

  private mapToBackend(p: PartidoFrontend): any {
    return {
      id: p.id,
      golesLocal: p.golesLocal,
      golesVisitante: p.golesVisitante,
      fechaHora: p.fechaHora,
      equipoLocal: { id: p.equipoLocal.id },
      equipoVisitante: { id: p.equipoVisitante.id },
      estadio: { id: p.estadio.id },
      arbitroPrincipal: { id: p.arbitroPrincipal.id },
      competicion: { id: p.competicion?.id }
    };
  }
}
