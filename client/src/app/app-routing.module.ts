import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistProfileComponent} from './artist-profile/artist-profile.component';
import { ArtistComponent} from './artist/artist.component';
import { LoginComponent } from './shared/login/login.component';
import { HomeComponent } from './shared/home/home.component';
import { RegisterComponent} from "./shared/register/register.component";

const routes: Routes = [
  { path: 'artistList', component: ArtistListComponent },
  { path: '', component: ArtistListComponent },
  { path: 'user', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
 //{ path: '**', redirectTo: 'user' }
  { path: 'profile/:username', component: ArtistProfileComponent },
  { path: 'artist/:username', component: ArtistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
