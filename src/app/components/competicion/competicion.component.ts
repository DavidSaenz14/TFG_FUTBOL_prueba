import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-competicion',
  templateUrl: './competicion.component.html',
  styleUrls: ['./competicion.component.css']
})
export class CompeticionComponent implements OnInit {
  competiciones: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getCompeticiones().subscribe(data => {
      this.competiciones = data;
    });
  }
}

