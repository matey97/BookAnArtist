import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../shared/artist/artist.service';
import {MultimediaService} from '../shared/multimedia/multimedia.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Array<any>;


  constructor(private artistService: ArtistService,
              private multimediaServie: MultimediaService) { }

  ngOnInit() {
    this.artistService.getAll().subscribe(data => {
      this.artists = data;
      this.getMultimediaFiles();
    });

  }

  private getMultimediaFiles() {
    this.artists.forEach((artist) => {
      artist.rawImages = [];
      artist.images.forEach( id => {
        this.multimediaServie.getImage(id).subscribe(data => {
          artist.rawImages.push(data);
        });
      });
      artist.rawVideos = [];
      artist.videos.forEach( id => {
        this.multimediaServie.getVideo(id).subscribe( data => {
          artist.rawVideos.push(data);
        });
      });
    });
  }

}


