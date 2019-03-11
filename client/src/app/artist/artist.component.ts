import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../shared/artist/artist.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user/user.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: any;
  user;
  username: string;


  constructor( private artistService: ArtistService,
               private userService: UserService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getArtistProfile();


  }

  private getArtistProfile() {



    this.artistService.getArtistByUsername(this.username).subscribe(data => {
      this.artist = data;
    });

    this.userService.getMockLoguedUser().subscribe(user => {
      this.user = user;
      this.artistService.getArtistByUsername(this.user.username).subscribe(artist => {
        if (artist.username == null) {
          artist.username = user.username;
        }

        this.userService.getProfileImage(this.user.username).subscribe(image => {
          this.user.rawImage = image.raw;
        });
      });
    });
  }
}
