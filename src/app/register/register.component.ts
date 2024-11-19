import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isRegistered = false;
  registrationError: any;
  registrationSuccess: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.userService.checkUserExists(username, email).subscribe(exists => {
        if (!exists) {
          this.userService.registerUser(username, email, password).subscribe(
            user => {
              this.isRegistered = true;
              this.registrationSuccess = { message: 'Registration successful!' }; // Mensaje de éxito
              console.log('User registered successfully:', user);
            },
            error => {
              this.registrationError = error;
              console.error('Registration error:', error);
            }
          );
        } else {
          this.registrationError = 'El nombre de usuario o el correo electrónico ya están en uso.';
          console.error('El nombre de usuario o el correo electrónico ya están en uso.');
        }
      });
    }
  }
}
