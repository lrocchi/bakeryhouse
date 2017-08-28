import { AuthService } from '../_services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private auth: AuthService, private router: Router) { }

    canActivate() {

      try {
        if (this.auth.loggedIn()) {
            // logged in so return true

           return true;
        }else {

            // not logged in so redirect to login page
            this.router.navigate(['/login']);
            return false;
        }
      } catch (e) {

        // not logged in so redirect to login page
          this.router.navigate(['/login']);
          return false;

      }
  }

}

// export * from './auth.guard';
