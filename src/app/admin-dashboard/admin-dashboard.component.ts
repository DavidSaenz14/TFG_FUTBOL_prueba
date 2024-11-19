import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service'; // Asumiendo que tienes un UserService

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // Corrección: use 'styleUrls' en plural
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  isLoading = true; // Indicador de carga
  errorMessage = ''; // Mensaje de error

  constructor(private userService: UserService) {} // Inyecta UserService

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading users.';
        this.isLoading = false;
      }
    });
  }
}