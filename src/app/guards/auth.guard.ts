import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const requiredRoles: string[] = route.data['roles'];
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const userRoles = this.getUserRoles();

    const normalizedRequiredRoles = requiredRoles.map(role => role.toLowerCase());
    const hasRequiredRole = userRoles.some(role => normalizedRequiredRoles.includes(role));

    if (hasRequiredRole) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }

  private getUserRoles(): string[] {
    const currentUser = this.authService.currentUserValue;

    if (!currentUser) return [];

    const roles = currentUser['roles'] || currentUser['role'] || currentUser['rol'] || [];
    const rolesArray = Array.isArray(roles) ? roles : [roles];

    return rolesArray
      .filter(r => typeof r === 'string')
      .map((role: string) => role.replace(/^ROLE_/, '').toLowerCase());
  }
}
