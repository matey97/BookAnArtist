import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../shared/artist/artist.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import {Artist} from '../model/Artist';
import {User} from '../model/User';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: Artist;
  profileImage: string;
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
      this.userService.getProfileImage(this.artist.username).subscribe(image => {
        this.profileImage = image.raw;
      });
    });
  }
}
