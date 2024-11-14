import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './app/login/login.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SitiosComponent } from './pages/sitios/sitios.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PrincipalComponent,
    SitiosComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AuthModule.forRoot({
      domain: 'dev-6s7jbkjjktvx2lak.us.auth0.com',
      clientId: '4gr4zWh9DB8zzeM6KiBLNxnovZrZCreD',
      authorizationParams: {
        redirect_uri: `${window.location.origin}/principal`  // Usando window.location.origin
      }
    }),    
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
