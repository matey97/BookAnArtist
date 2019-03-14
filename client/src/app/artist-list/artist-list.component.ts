import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../shared/artist/artist.service';
import {UserService} from '../shared/user/user.service';
import {MatInputModule} from '@angular/material/input';
import {Artist} from '../model/Artist';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {
  artists: Array<any>;
  artistsFiltrate: Array<any>;
  profileImage: string;

  values: Array<any>;
  prueba: any;


  // Atributos para la paginación
  page: number;
  pageSize: number;
  searchValue: string;

  constructor(private artistService: ArtistService,
              private userService: UserService) { }

  ngOnInit() {
    this.artistService.getAll().subscribe(data => {
      this.artists = data;
      this.artistsFiltrate = data;
      this.getMultimediaFiles();
    });
    // Inicializa la paginacion
    this.page = 1;
    this.pageSize = 5;
  }
  private getMultimediaFiles() {
    this.artists.forEach((artist) => {
      this.userService.getProfileImage(artist.username).subscribe(image => {
        artist.profileImage = image.raw;
      });
    });
  }


// Metodo apra gestionar la puntuación, revisar
  onPuntuado(value, index) {
    this.artists[index].puntuation += value;
    this.artists[index].nPuntuations += 1;
  }


  onSubmit(f: NgForm) {

    this.artistsFiltrate = this.artists;

    this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.artisticName.indexOf(f.value.first) > -1);
    this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.description.indexOf(f.value.last) > -1);

  }
}


