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

  habilities = ['Músico', 'Grupo musical', 'Banda', 'DJ', 'Mago', 'Animador', 'Cómico'];
  schedules = ['Mañana', 'Tarde', 'Noche'];
  zones = ['Álava', 'Albacete', 'Alicante', 'Almeria', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cadiz',
    'Cantabria', 'Castellón', 'Ceuta', 'Ciudad real', 'Cordoba', 'Cuenca', 'Girona', 'Las palmas de Gran Canaria', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'A Coruña', 'La Rioja', 'León', 'Lleida', 'Lugo', 'Madrid', 'Malaga', 'Melilla',
    'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa cruz de Tenerife',
    'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];
  artists: Array<any>;
  artistsFiltrate: Array<any>;
  profileImage: string;

  prueba: any;
  prueba2: any;
  hability: string;
  zona: string;
  schedule: string;



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
    this.prueba2 = 'asdadsasdad';
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
    this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.price > f.value.dineroMin);

    if (f.value.dineroMax === 1 || f.value.dineroMax === null) {
      this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.price < 8000);
    } else {
      this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.price < f.value.dineroMax);
    }

    if (f.value.habilities != null) {
      f.value.habilities.forEach(hability => this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.habilities.indexOf(hability.toString()) > -1));
    }

    if (f.value.zones != null) {
      f.value.zones.forEach(zone => this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.zones.indexOf(zone.toString()) > -1));
    }

    if ( f.value.schedules != null) {
      f.value.schedules.forEach(schedule => this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.schedules.indexOf(schedule.toString()) > -1));
    }
  }
}


