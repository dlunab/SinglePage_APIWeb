import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class Auth0Service {
  constructor(public auth: AuthService) {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    // Usa logoutParams en lugar de returnTo
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }

  isAuthenticated$ = this.auth.isAuthenticated$; // Observable que indica si el usuario está autenticado
}
