import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../shared/artist/artist.service';
import {PaymentService} from '../shared/payment/payment.service';
import {UserService} from '../shared/user/user.service';
import {NgForm} from '@angular/forms';

import {Payment} from '../model/Payment';
import {ContractService} from '../shared/contract/contract.service';
import {HABILITIES, SCHEDULES, ZONES} from '../artist-profile/artist-profile.component';



@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  habilities = HABILITIES;
  schedules = SCHEDULES;
  zones = ZONES;
  artists: Array<any>;
  artistsFiltrate: Array<any>;
  setArtistasFiltado: Set<any>;
  profileImage: string;
  prueba: Array<any>;
  prueba2: any;
  hability: string;
  zona: string;
  schedule: string;

  // Prueba payment

  payment: Payment;

  // Atributos para la paginación
  page: number;
  pageSize: number;
  searchValue: string;

  constructor(private artistService: ArtistService,
              private paymentService: PaymentService,
              private userService: UserService) { }

  ngOnInit() {
    this.artistService.getAll().subscribe(data => {
      this.artists = data;
      this.artistsFiltrate = data;
      this.getMultimediaFiles();
      this.setArtistasFiltado = new Set();
      this.zona = null;
      this.prueba2 = 'Prueba';
      this.artists.forEach( artistData => {
        this.userService.getUserByUsername(artistData.username).subscribe( userData => {
          artistData.puntuation = userData.puntuation;

        });
      });
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
    this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.artisticName.toLocaleLowerCase().indexOf(f.value.first.toString().toLocaleLowerCase()) > -1);
    this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.description.toLocaleLowerCase().indexOf(f.value.last.toString().toLocaleLowerCase()) > -1);

    // Para que lapuntuacion del artista sea coherente con la de su usuario
    // Chapuza para no cambiar el modelo entero
    // this.artistsFiltrate.forEach(artist => {
    //   this.userService.getUserByUsername(artist.username).subscribe( user => {
    //     artist.puntuation = user.puntuation;
    //   });
    // })

    this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.puntuation >= f.value.puntuacionElegida);

    this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.price > f.value.dineroMin);
    if (f.value.dineroMax === 1 || f.value.dineroMax === null) {
      this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.price < 800000000000);
    } else {
      this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.price < f.value.dineroMax);
    }
    if (this.zona != null) {
      this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.zones.indexOf(this.zona) > -1);
    }
    if ( f.value.schedules != null) {
      f.value.schedules.forEach(schedule => this.artistsFiltrate = this.artistsFiltrate.filter(artist => artist.schedules.indexOf(schedule.toString()) > -1));
    }
    this.setArtistasFiltado.clear();
    if (f.value.habilities != null && f.value.habilities.length > 0) {
      f.value.habilities.forEach((hability) => {
        this.artists.forEach((artist) => {
          if (artist.habilities.indexOf(hability.toString()) > -1) {
            this.setArtistasFiltado.add(artist);
          }
        });
      });
      this.artistsFiltrate = this.artistsFiltrate.filter((value, index, arr) => {
        return this.setArtistasFiltado.has(value);
      });
    }
  }
}


