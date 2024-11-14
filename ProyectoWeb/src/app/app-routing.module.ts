import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SitiosComponent } from './pages/sitios/sitios.component';
import { LoginComponent } from './app/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'sitios', component: SitiosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }