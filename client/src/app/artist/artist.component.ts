import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ArtistService } from '../shared/artist/artist.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import {Artist} from '../model/Artist';
import {User} from '../model/User';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ContratationComponent} from './contratation/contratation.component';

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

  loguedUser;


  constructor( private artistService: ArtistService,
               private userService: UserService,
               private route: ActivatedRoute,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getArtistProfile();
  }

  private getArtistProfile() {
    this.artistService.getArtistByUsername(this.username).subscribe(data => {
      this.artist = data;
      this.userService.getLoguedUser().subscribe(user =>{
        this.loguedUser = user;
      });
      this.userService.getProfileImage(this.artist.username).subscribe(image => {
        this.profileImage = image.raw;
      });
    });
  }

  public openContratationModal(modal, authReq) {
    if (this.loguedUser != null && this.loguedUser.userType === 'ORGANIZER') {
      this.modalService.open(modal, {centered: true, backdropClass: 'modal-backdrop-chachiguay', size: 'lg'});
    } else {
      this.modalService.open(authReq, {centered: true, backdropClass: 'modal-backdrop-chachiguay', size: 'lg'});
    }
  }
}
