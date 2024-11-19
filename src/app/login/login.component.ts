import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Define una interfaz para registrationSuccess si conoces su estructura
interface RegistrationSuccessResponse {
  message: string;
  // Añade otros campos según sea necesario
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error: string | null = null;
  registrationSuccess: RegistrationSuccessResponse | null = null; // Mejorar el tipo según sea necesario

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/';
  }

  ngOnInit() {
    // Redireccionar al inicio si el usuario ya está autenticado
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

    // Obtener URL de retorno de los parámetros de ruta o usar '/' por defecto
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
     .subscribe(
        (data: RegistrationSuccessResponse) => {
          this.registrationSuccess = data; // Asignar la respuesta exitosa a registrationSuccess
          this.router.navigate([this.returnUrl]);
        },
        (error: any) => {
          this.error = error.message; // Mejorar el manejo de errores
          // Considera mostrar un mensaje de error en la UI aquí
        }
      );
  }
}
