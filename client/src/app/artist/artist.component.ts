import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../shared/artist/artist.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import { MultimediaService } from '../shared/multimedia/multimedia.service';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: any;
  username: string;

  constructor( private artistService: ArtistService,
               private userService: UserService,
               private multimediaServie: MultimediaService,
               private route: ActivatedRoute) { }

  ngOnInit() {

    this.username = this.route.snapshot.paramMap.get('username');
    this.getArtistProfile();
    // this.getMultimediaFiles();

  }

  private getArtistProfile() {



    this.artistService.getArtistByUsername(this.username).subscribe(data => {
      this.artist = data;
    });

    this.userService.getProfileImage(this.username).subscribe(image => {
      this.artist.image = image.raw;
    });

  }

  /*

  private getMultimediaFiles() {

    this.userService.getProfileImage(this.username).subscribe(image => {
      this.artist.image = image.raw;
    });
    this.artist.rawImages = [];
    this.artist.images.forEach( username => {
      this.multimediaServie.getImage(username).subscribe(data => {
        this.artist.rawImages.push(data);
      });
    });
    this.artist.rawVideos = [];
    this.artist.videos.forEach( username => {
      this.multimediaServie.getVideo(username).subscribe( data => {
        this.artist.rawVideos.push(data);
      });
    });
  }

  */

}
