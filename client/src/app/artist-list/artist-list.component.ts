import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../shared/artist/artist.service';
import {MultimediaService} from '../shared/multimedia/multimedia.service';
import {UserService} from '../shared/user/user.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists: Array<any>;

  // Atributos para la paginación
  page: number;
  pageSize: number;

  constructor(private artistService: ArtistService,
              private multimediaServie: MultimediaService,
              private userService: UserService) { }

  ngOnInit() {
    this.artistService.getAll().subscribe(data => {
      this.artists = data;
      this.getMultimediaFiles();
    });
    // Inicializa la paginacion
    this.page = 2;
    this.pageSize = 2;
  }
  private getMultimediaFiles() {
    this.artists.forEach((artist) => {
      this.userService.getProfileImage(artist.username).subscribe(image => {
        artist.image = image.raw;
      });
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


// Metodo apra gestionar la puntuación, revisar
  onPuntuado(value, index) {

    this.artists[index].puntuation += value;
    this.artists[index].nPuntuations += 1;

  }




}


