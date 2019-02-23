import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../shared/artist/artist.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Array<any>;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artistService.getAll().subscribe(data => {
      this.artists = data;
    });
  }

}
