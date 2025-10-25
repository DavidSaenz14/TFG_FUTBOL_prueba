import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface LoginResponse {
  token: string;
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
  loginSuccess: string | null = null;

  registrationSuccess: { message: string } | null = null;  // <-- Aquí

  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required]
    });
    this.returnUrl = '/';
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }

    // Capturar mensaje de éxito de registro (por ejemplo: ?registrationSuccess=Usuario%20creado%20correctamente)
    const registrationMsg = this.route.snapshot.queryParams['registrationSuccess'];
    if (registrationMsg) {
      this.registrationSuccess = { message: registrationMsg };
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.error = 'Por favor, completa correctamente todos los campos.';
      this.loginSuccess = null;
      return;
    }

    this.error = null;
    this.loginSuccess = null;
    this.isSubmitting = true;

    const correo = this.loginForm.get('correoElectronico')?.value;
    const clave = this.loginForm.get('contraseña')?.value;

    this.authService.login(correo, clave).subscribe(
      (response: LoginResponse) => {
        this.isSubmitting = false;
        if (response?.token) {
          this.authService.setToken(response.token);
          localStorage.setItem('token', response.token);

          this.loginSuccess = 'Has iniciado sesión correctamente.';
          this.error = null;
          this.registrationSuccess = null; // ocultamos mensaje de registro al iniciar sesión

          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 2000);
        } else {
          this.error = 'La respuesta del servidor no contiene un token.';
          this.loginSuccess = null;
        }
      },
      (error) => {
        this.isSubmitting = false;
        const mensaje = error?.error?.message || error?.error || 'Ocurrió un error al iniciar sesión.';
        this.error = mensaje;
        this.loginSuccess = null;
      }
    );
  }
}
