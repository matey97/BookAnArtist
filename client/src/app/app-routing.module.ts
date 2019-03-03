import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';

const routes: Routes = [
  { path: 'artistList', component: ArtistListComponent },
  { path: '', component: ArtistListComponent },
  { path: 'user', component: HomeComponent },
  { path: 'login', component: LoginComponent },
 // { path: '**', redirectTo: 'user' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
