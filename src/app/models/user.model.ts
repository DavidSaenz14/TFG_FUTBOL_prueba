export interface User {
    id?: number; // El signo de interrogación indica que el campo es opcional
    username: string;
    email: string;
    password: string;
    role: string; // Por ejemplo, 'admin', 'user', etc.
  }