import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {ArtistService} from '../shared/artist/artist.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  private user;
  private artist;
  private habilities = ['Músico', 'Mago', 'DJ', 'Banda', 'Narcoterrorista', 'Cómico'];
  private listaHabilidades;

  constructor(private userService: UserService,
              private artistService: ArtistService) { }

  ngOnInit() {
    this.userService.getMockLoguedUser().subscribe(user => {
      this.user = user;
      this.artistService.getArtistByUsername(this.user.username).subscribe(artist => {
        this.artist = artist;
        this.userService.getProfileImage(this.artist.username).subscribe(image => {
          this.artist.image = image.raw;
        });
      });
    });
  }

}
