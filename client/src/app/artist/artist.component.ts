import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ArtistService } from '../shared/artist/artist.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import {Artist} from '../model/Artist';
import {User} from '../model/User';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContratationComponent} from './contratation/contratation.component';
import {LoginService} from '../shared/loginService/login.service';
import {NgForm} from '@angular/forms';
import {Valoracion} from '../model/Valoracion';
import { Router } from '@angular/router';
import {Contract} from '../model/Contract';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistComponent implements OnInit {

  artist: Artist;
  profileImage: string;
  username: string;
  listValoraciones: Array<any>;
  valorationStarts: number;
  loguedUser;
  valoracionNueva: Valoracion;
  userProfileImageValoracion: Array<any>;
  noHaValorado: boolean;
  HaContratado: boolean;
  page: any;
  pageSize: number;


  constructor( private artistService: ArtistService,
               private userService: UserService,
               private loginService: LoginService,
               private route: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getArtistProfile();

    this.page = 1;
    this.pageSize = 5;


  }

  private getArtistProfile() {
    this.artistService.getArtistByUsername(this.username).subscribe(data => {
      this.artist = data;
      this.listValoraciones = this.artist.valoraciones;
      this.loguedUser = this.loginService.getLoguedUser();
      this.noHaValorado = true;
      this.listValoraciones.forEach( valoracion => {

      if (this.loguedUser && valoracion.valorador === this.loguedUser.username) {
        this.noHaValorado = false;
      }
      this.HaContratado = false;
      this.artist.contracts.forEach(contract => {
        if (this.loguedUser) {
          if (contract.organizerUsername === this.loguedUser.username && (contract.state === 'DONE' || contract.state === 'CANCELLED' || contract.state === 'ACCEPTED')) {
            this.HaContratado = true;
          }
        }
      });

      this.userService.getProfileImage(valoracion.valorador).subscribe( img => {
          valoracion.imgProfileValorador = img.raw;
        });
      });

      this.userService.getProfileImage(this.artist.username).subscribe(image => {
        this.profileImage = image.raw;
      });
    });
  }

  public openContratationModal(modal, authReq) {
    if (this.loguedUser != null && this.loguedUser.usertype === 'ORGANIZER') {
      this.modalService.open(modal, {centered: true, backdropClass: 'modal-backdrop-chachiguay', size: 'lg'});
    } else {
      this.modalService.open(authReq, {centered: true, backdropClass: 'modal-backdrop-chachiguay', size: 'lg'});
    }
  }

  public openValorationModal(modal) {
    if (this.loguedUser != null) {
     this.valorationStarts = 5;
     this.modalService.open(modal, {centered: true, backdropClass: 'modal-backdrop-chachiguay',  size: 'lg'});
    }


  }

  public onSubmit(f: NgForm) {

    this.valoracionNueva = new Valoracion();
    this.valoracionNueva.puntuacion = this.valorationStarts;
    this.valoracionNueva.comentario = f.value.comentario;
    this.valoracionNueva.valorado = this.artist.username;
    this.valoracionNueva.valorador = this.loguedUser.username;
    this.artistService.postAddValoration(this.valoracionNueva).subscribe(res => {
      this.ngOnInit();
      }
    );
    this.modalService.dismissAll();
    this.snackBar.open('Comentario reguistado con éxito', 'Cerrar', {duration: 3000});

  }


  borrarValoracion(valoracion: Valoracion) {

    this.artistService.postDeleteValoracion(valoracion).subscribe( () => {

      this.snackBar.open('Se ha eliminado tu comentario', 'Cerrar', {duration: 3000});
      this.ngOnInit();
    });


  }
}
