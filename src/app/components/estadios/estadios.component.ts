import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-estadios',
  templateUrl: './estadios.component.html',
  styleUrls: ['./estadios.component.css']
})
export class EstadiosComponent implements OnInit {
  estadios: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getEstadios().subscribe(data => {
      this.estadios = data;
    });
  }
}
