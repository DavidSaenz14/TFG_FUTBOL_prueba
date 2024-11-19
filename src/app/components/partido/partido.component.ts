import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css']
})
export class PartidoComponent implements OnInit {
  partidos: any[] = [];
  equipos: any[] = [];
  currentPartido: any = {};
  editingPartido: boolean = false;
  newPartido: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPartidos();
    this.loadEquipos();
  }

  loadPartidos(): void {
    this.apiService.getPartidos().subscribe(data => {
      this.partidos = data;
    });
  }

  loadEquipos(): void {
    this.apiService.getEquipos().subscribe(data => {
      this.equipos = data;
    });
  }

  createPartido(): void {
    this.apiService.createPartido(this.currentPartido).subscribe(() => {
      this.loadPartidos();
      this.resetForm();
    });
  }

  updatePartido(): void {
    this.apiService.updatePartido(this.currentPartido.id, this.currentPartido).subscribe(() => {
      this.loadPartidos();
      this.resetForm();
    });
  }

  deletePartido(id: number): void {
    this.apiService.deletePartido(id).subscribe(() => {
      this.loadPartidos();
    });
  }

  editPartido(partido: any): void {
    this.currentPartido = { ...partido };
    this.editingPartido = true;
    this.newPartido = false;
  }

  addNewPartido(): void {
    this.currentPartido = {};
    this.newPartido = true;
    this.editingPartido = false;
  }

  resetForm(): void {
    this.currentPartido = {};
    this.editingPartido = false;
    this.newPartido = false;
  }

  cancel(): void {
    this.resetForm();
  }
}
