import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../model/Artist';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ZONES} from '../../artist-profile/artist-profile.component';
import {NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {Contract} from '../../model/Contract';
import {ContractService} from '../../shared/contract/contract.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-contratation',
  templateUrl: './contratation.component.html',
  styleUrls: ['./contratation.component.scss']
})
export class ContratationComponent implements OnInit {

  @Input()
  artist: Artist;
  @Input()
  modal;
  @Input()
  loguedUser;

  myControl: FormControl;
  filteredZones: Observable<string[]>;
  currentDate: Date;
  dateFilter;
  limitDateFilter;

  contract: Contract;

  date: Date;
  time: NgbTimeStruct;
  limitDate: Date;

  constructor(private modalService: NgbModal,
              private contractService: ContractService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.contract = new Contract();
    this.myControl = new FormControl();
    this.filteredZones = this.myControl.valueChanges.pipe(
      startWith(''),
      map(formState => this.filter(formState))
    );
    this.currentDate = new Date();
    this.dateFilter = (d: Date): boolean => {
      return d.getTime() > this.currentDate.getTime();
    };
    this.limitDateFilter = (d: Date): boolean => {
      return d.getTime() > this.currentDate.getTime() && d.getTime() < this.date.getTime();
    };
  }

  private filter(value): string[] {
    const filterValue = value.toLowerCase();
    return ZONES.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private askConfirmation(confModal) {
    this.date.setHours(this.time.hour, this.time.minute);
    this.modalService.open(confModal, {centered: true, backdropClass: 'modal-backdrop-chachiguay'});
  }

  public  validData(): boolean {
    const contract: Contract = this.contract;
    if (contract.zone.length === 0 || contract.location.length === 0 || this.date === undefined || this.time === undefined || this.limitDate === undefined) {
      return false;
    }
    return true;
  }

  private saveContract(modalRef) {
    this.contract.id = -1;
    this.contract.state = null;
    this.contract.organizerUsername = this.loguedUser.username;
    this.contract.artisticUsername = this.artist.username;
    this.date.setHours(this.time.hour, this.time.minute);
    this.contract.date = this.date.getTime();
    this.contract.limitDate = this.limitDate.getTime();
    this.contractService.postContract(this.contract).subscribe((item) => {
        if (item) {
          this.snackBar.open('Petición completada. Se ha enviado una notificación al artista.', 'Cerrar', {duration: 3000});
        } else {
          this.snackBar.open('No se ha podido tratar tu petición.', 'Cerrar', {duration: 3000});
        }
      },
      error1 => {
        this.snackBar.open('Ha ocurrido un error', 'Cerrar', {duration: 3000});
      });
    modalRef.close();
    this.modal.close();
  }
}
