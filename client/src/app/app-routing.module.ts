import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistListComponent } from './artist-list/artist-list.component';
import {ArtistProfileComponent} from './artist-profile/artist-profile.component';
import {ArtistComponent} from './artist/artist.component';


const routes: Routes = [
  { path: 'artistList', component: ArtistListComponent },
  { path: 'profile/:username', component: ArtistProfileComponent },
  { path: 'artist/:username', component: ArtistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
