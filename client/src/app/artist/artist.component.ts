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
  habilidades: Array<string>
  username: string;


  constructor( private artistService: ArtistService,
               private userService: UserService,
               private route: ActivatedRoute) { }

  ngOnInit() {

    this.username = this.route.snapshot.paramMap.get('username');
    this.getArtistProfile();
    this.getMultimediaFiles();
    this.habilidades = this.artist.habilities;

  }

  private getArtistProfile() {



    this.artistService.getArtistByUsername(this.username).subscribe(data => {
      this.artist = data;
    });

    this.userService.getProfileImage(this.username).subscribe(image => {
      this.artist.image = image.raw;
    });

  }

  private getMultimediaFiles() {

    /*
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
    });*/
  }

}
