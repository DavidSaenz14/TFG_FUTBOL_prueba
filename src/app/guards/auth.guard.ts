import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // Check if the route is restricted by role(s)
      let requiredRoles = route.data['roles'];
      
      // Convert roles from string to array if they're not already
      if (!Array.isArray(requiredRoles)) {
        requiredRoles = [requiredRoles];
      }

      // Check if the user has one of the required roles
      const hasRequiredRole = requiredRoles.some((role: any) => currentUser.roles?.includes(role));

      if (!hasRequiredRole) {
        // Role not authorized, redirect to unauthorized page
        this.router.navigate(['/unauthorized']);
        return false;
      }
      // Authorized, so return true
      return true;
    }

    // Not logged in, redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}