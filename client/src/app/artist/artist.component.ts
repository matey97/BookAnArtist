import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../shared/artist/artist.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/user/user.service';
import {Artist} from '../model/Artist';
import {User} from '../model/User';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: Artist;
  profileImage: string;
  username: string;

  contratationModalVisible: boolean;

  constructor( private artistService: ArtistService,
               private userService: UserService,
               private route: ActivatedRoute,
               private modalService: NgbModal) { }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getArtistProfile();
    this.contratationModalVisible = false;
  }

  private getArtistProfile() {
    this.artistService.getArtistByUsername(this.username).subscribe(data => {
      this.artist = data;
      this.userService.getProfileImage(this.artist.username).subscribe(image => {
        this.profileImage = image.raw;
      });
    });
  }

  public openContratationModal(modal) {
    this.modalService.open(modal);
  }
}
