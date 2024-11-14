import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(public auth: AuthService, private router: Router) {}

  ingresar() {
    //console.log(Usuario: ${this.username}, Contraseña: ${this.password});
    this.router.navigate(['/principal']); // Redirige a la página principal
  }

  loginWithAuth0() {
    this.auth.loginWithRedirect({
      appState: { target: '/principal' }  // Dirige a /principal después de iniciar sesión
    });
  }
}