import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthService } from '@services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authService.isLoggedIn();

    if (isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    }
  }
}
