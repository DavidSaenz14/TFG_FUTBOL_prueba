import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  styleUrls: ['./arbitros.component.css']
})
export class ArbitrosComponent implements OnInit {
  arbitros: any[] = [];
  editingArbitro: any;
  newArbitro: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadArbitros();
  }

  loadArbitros() {
    this.apiService.getArbitros().subscribe(data => {
      this.arbitros = data;
    });
  }

  createArbitro() {
    if (this.newArbitro) {
      this.apiService.createArbitro(this.newArbitro).subscribe(() => {
        this.loadArbitros(); // Recargar la lista de árbitros después de crear uno nuevo
        this.newArbitro = null; // Limpiar el nuevo árbitro después de la creación exitosa
      });
    }
  }

  updateArbitro() {
    if (this.editingArbitro) {
      this.apiService.updateArbitro(this.editingArbitro.id, this.editingArbitro).subscribe(() => {
        this.loadArbitros(); // Recargar la lista de árbitros después de actualizar
        this.editingArbitro = null; // Limpiar el árbitro en edición después de la actualización exitosa
      });
    }
  }

  deleteArbitro(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este árbitro?')) {
      this.apiService.deleteArbitro(id).subscribe(() => {
        this.loadArbitros(); // Recargar la lista de árbitros después de eliminar uno
      });
    }
  }
}

