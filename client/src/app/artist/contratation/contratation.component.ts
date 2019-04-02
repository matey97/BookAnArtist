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

  myControl: FormControl;
  filteredZones: Observable<string[]>;
  currentDate: Date;
  dateFilter;

  contract: Contract;

  date: Date;
  time: NgbTimeStruct;

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
  }

  private filter(value): string[] {
    const filterValue = value.toLowerCase();
    return ZONES.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private askConfirmation(confModal) {
    this.modalService.open(confModal, {centered: true, backdropClass: 'modal-backdrop-chachiguay'});
  }

  private saveContract(modalRef) {
    this.contract.id = -1;
    this.contract.state = null;
    this.contract.organizerUsername = 'Pepe'; // TODO Cambiar por loguedUser
    this.contract.artisticUsername = this.artist.username;
    this.date.setHours(this.time.hour, this.time.second);
    this.contract.date = this.date.getTime();
    this.contractService.postContract(this.contract).subscribe((item) => {
        console.log('Exito');
        if (item) {
          this.snackBar.open('Petición completada. Se ha enviado una notificación al artista.', 'Cerrar', {duration: 3000});
        } else {
          this.snackBar.open('No se ha podido tratar tu petición.', 'Cerrar', {duration: 3000});
        }
      },
      error1 => {
        console.log('Error');
        this.snackBar.open('Ha ocurrido un error', 'Cerrar', {duration: 3000});
      });
    modalRef.close();
    this.modal.close();
  }
}
