import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {LoginService} from '../shared/loginService/login.service';
import {ReclamationService} from '../shared/reclamation/reclamation.service';
import {Reclamation} from '../model/Reclamation';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {errorSubscriber, successSubscriber} from '../contract-list/contract-list.component';
import {MatSnackBar} from '@angular/material';

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

  openReclamations: Array<Reclamation>;
  closedReclamations: Array<Reclamation>;

  newerSorter = (r1, r2) => {
    return r2.creationDate - r1.creationDate;
  }

  olderSorter = (r1, r2) => {
    return r1.creationDate - r2.creationDate;
  }

  constructor(private loginService: LoginService,
              private reclamationService: ReclamationService,
              private carouselConfig: NgbCarouselConfig,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.carouselConfig.interval = 0;
    this.reclamationDoneList = new Array<Reclamation>();
    this.reclamationReceivedList = new Array<Reclamation>();
    this.openReclamations = new Array<Reclamation>();
    this.closedReclamations = new Array<Reclamation>();
    this.loguedUser = this.loginService.getLoguedUser();
    if (this.loguedUser.usertype === 'ADMIN') {
      this.reclamationService.getAllReclamations().subscribe(reclamations => {
        this.openReclamations = reclamations.open;
        this.closedReclamations = reclamations.closed;

        this.openReclamations.sort(this.olderSorter);
        this.closedReclamations.sort(this.newerSorter);
      });
    } else {
      this.reclamationService.getReclamationByUser(this.loguedUser.username).subscribe(reclamations => {
        this.reclamationDoneList = reclamations.done;
        this.reclamationReceivedList = reclamations.received;

        this.reclamationDoneList.sort(this.newerSorter);
        this.reclamationReceivedList.sort(this.newerSorter);
      });
    }
  }

  public getDate(time: number): string {
    if (time === null) {
      return '---';
    }
    return new Date(time).toLocaleString();
  }

  public cancelReclamation(reclamation: Reclamation) {
    reclamation.state = 'CANCELLED';
    this.reclamationService.cancelReclamation(reclamation.id).subscribe(successSubscriber, errorSubscriber);
  }

  public archiveReclamation(reclamation: Reclamation) {
    this.reclamationService.archiveReclamation(reclamation.id).subscribe((item) => {
      if (item) {
        this.snackBar.open('Cambios gueardados correctamente.', 'Cerrar', {duration: 3000});
        reclamation.state = 'CLOSED';
        reclamation.updateDate = new Date().getTime();
        this.openReclamations = this.openReclamations.filter(r => r.id !== reclamation.id);
        this.closedReclamations.push(reclamation);
      } else {
        this.snackBar.open('No se ha podido tratar tu petición.', 'Cerrar', {duration: 3000});
      }
    }, errorSubscriber);
  }

  public acceptReclamation(reclamation: Reclamation) {
    this.reclamationService.acceptReclamation(reclamation.id).subscribe((item) => {
      if (item) {
        this.snackBar.open('Cambios gueardados correctamente.', 'Cerrar', {duration: 3000});
        reclamation.state = 'ACCEPTED';
        reclamation.updateDate = new Date().getTime();
        this.openReclamations = this.openReclamations.filter(r => r.id !== reclamation.id);
        this.closedReclamations.push(reclamation);
      } else {
        this.snackBar.open('No se ha podido tratar tu petición.', 'Cerrar', {duration: 3000});
      }
    }, errorSubscriber);
  }
}
