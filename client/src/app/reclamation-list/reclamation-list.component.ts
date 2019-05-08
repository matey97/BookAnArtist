import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {LoginService} from '../shared/loginService/login.service';
import {ReclamationService} from '../shared/reclamation/reclamation.service';
import {Reclamation} from '../model/Reclamation';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent implements OnInit {

  loguedUser: User;
  stateTransformation = new Map([['OPEN', 'Abierta'], ['CLOSED', 'Cerrada'], ['ACCEPTED', 'Aceptada'], ['CANCELLED', 'Cancelado']]);

  reclamationDoneList: Array<Reclamation>;
  reclamationReceivedList: Array<Reclamation>;

  constructor(private loginService: LoginService,
              private reclamationService: ReclamationService,
              private carouselConfig: NgbCarouselConfig) { }

  ngOnInit() {
    this.carouselConfig.interval = 0;
    this.reclamationDoneList = new Array<Reclamation>();
    this.reclamationReceivedList = new Array<Reclamation>();
    this.loguedUser = this.loginService.getLoguedUser();
    this.reclamationService.getReclamationByUser(this.loguedUser.username).subscribe(reclamations => {
      this.reclamationDoneList = reclamations.done;
      this.reclamationReceivedList = reclamations.received;
    });
  }

  public getDate(time: number): string {
    if (time === null) {
      return '---';
    }
    return new Date(time).toLocaleString();
  }



}
