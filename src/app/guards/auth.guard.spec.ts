import { TestBed } from '@angular/core/testing';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for canActivate()', () => {
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;
    expect(guard.canActivate(route, state)).toEqual(true);
  });
});

