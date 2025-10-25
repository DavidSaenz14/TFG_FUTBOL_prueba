import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registrationSuccess: string | null = null;
  registrationError: string | null = null;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required] // Por defecto "user"
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.registrationError = null;
    this.registrationSuccess = null;

    if (this.registerForm.invalid) {
      this.registrationError = 'Por favor completa todos los campos correctamente.';
      return;
    }

    this.isSubmitting = true;
    const { username, email, password, role } = this.registerForm.value;

    // Verifica si el usuario ya existe usando /auth/check
    this.userService.checkUserExists(username, email).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this.registrationError = 'El nombre de usuario o el correo electrónico ya están en uso.';
          this.isSubmitting = false;
        } else {
          // Registro usando /auth/register
          this.userService.registerUser(username, email, password, role).subscribe({
            next: user => {
              this.isSubmitting = false;
              this.registrationSuccess = 'Registro exitoso. ¡Bienvenido!';
              console.log('User registered successfully:', user);

              // Redirige al login después de 2 segundos
              setTimeout(() => {
                this.router.navigate(['/login'], {
                  queryParams: { registrationSuccess: 'Usuario creado correctamente' }
                });
              }, 2000);
            },
            error: err => {
              this.isSubmitting = false;
              this.registrationError = err?.error || 'Error durante el registro. Por favor, inténtalo de nuevo.';
              console.error('Registration error:', err);
            }
          });
        }
      },
      error: err => {
        this.isSubmitting = false;
        this.registrationError = 'Error al verificar usuario existente.';
        console.error('Check user error:', err);
      }
    });
  }
}
