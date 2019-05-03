import {Component, OnInit, ViewChild} from '@angular/core';
import {ContractService} from '../shared/contract/contract.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../shared/user/user.service';
import {User} from '../model/User';
import {Contract} from '../model/Contract';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {LoginService} from '../shared/loginService/login.service';
import {ArtistService} from '../shared/artist/artist.service';
import {Artist} from '../model/Artist';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Valoracion} from '../model/Valoracion';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  artistDisplayedColumns = ['organizerUsername', 'comments', 'location', 'zone', 'date', 'state', 'operations'];
  organizerDisplayedColumns = ['artisticUsername', 'comments', 'location', 'zone', 'date', 'state', 'operations'];

  stateTransformation = new Map([['ACCEPTANCE_PENDING', 'Pendiente de aceptación'], ['ACCEPTED', 'Aceptado'], ['DONE', 'Realizado'], ['REJECTED', 'Rechazado'], ['CANCELLED', 'Cancelado']]);

  loguedUser: User;
  contracts: Contract[];

  dataSource;
  displayedColumns;

  valorationEditar: Valoracion;
  currentDate: Date;
  isArtist: boolean;
  valoracionNueva: Valoracion;
  valorationStarts: number;
  usernameOrganizer: string;
  listValoraciones: Array<any>;



  successSubscriber = (item) => {
    if (item) {
      this.snackBar.open('Cambios gueardados correctamente.', 'Cerrar', {duration: 3000});
    } else {
      this.snackBar.open('No se ha podido tratar tu petición.', 'Cerrar', {duration: 3000});
    }
  }

  errorSubscriber = (error) => {
    this.snackBar.open('Ha ocurrido un error', 'Cerrar', {duration: 3000});
  }


  constructor(private contractService: ContractService,
              private userService: UserService,
              private loginService: LoginService,
              private artistService: ArtistService,
              private modalService: NgbModal,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.loguedUser = this.loginService.getLoguedUser();
    if (this.loguedUser.usertype === 'ARTIST') {
      this.isArtist = true;
      this.contractService.getArtistContracts(this.loguedUser.username).subscribe(contracts => {
        this.contracts = contracts;

        this.contracts.forEach( contrat => {
          this.userService.getUserByUsername(contrat.organizerUsername).subscribe(data => {
            data.valoraciones.forEach(valoracion => {
              if (valoracion.valorador === this.loguedUser.username) {
                console.log(contrat.haSidoValorado);
                contrat.haSidoValorado = true;
                console.log(contrat.haSidoValorado);
              }
            });
            this.displayedColumns = this.artistDisplayedColumns;
            this.configureDataSource(this.contracts);
            this.configureTablePaginatorAndSorting();
          });

        });
      });
    } else {
      this.isArtist = false;
      this.contractService.getOrganizerContracts(this.loguedUser.username).subscribe(contracts => {
        this.contracts = contracts;
        this.contracts.forEach( contrat => {
          contrat.haSidoValorado = false;
          this.userService.getUserByUsername(contrat.artisticUsername).subscribe(data => {
            data.valoraciones.forEach( valoracion => {
              if (valoracion.valorador === this.loguedUser.username) {
                contrat.haSidoValorado = true;
              }

            });
            this.displayedColumns = this.organizerDisplayedColumns;
            this.configureDataSource(this.contracts);
            this.configureTablePaginatorAndSorting();

          });
        });

      });
    }
  }

  private configureDataSource(contacts) {
    this.dataSource = new MatTableDataSource<Contract>(contacts);
  }

  private configureTablePaginatorAndSorting() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getDate(time: number): string {
    return new Date(time).toLocaleString();
  }

  public acceptContract(contract: Contract) {
    contract.state = 'ACCEPTED';
    this.contractService.acceptContract(contract.id).subscribe(this.successSubscriber, this.errorSubscriber);
  }

  public declineContract(contract) {
    contract.state = 'REJECTED';
    this.contractService.declineContract(contract.id).subscribe(this.successSubscriber, this.errorSubscriber);
  }

  public cancelContract(contract) {
    contract.state = 'CANCELLED';
    this.contractService.cancelContract(contract.id).subscribe(this.successSubscriber, this.errorSubscriber);
  }

  public openValorationModal(modal, usernameOrganizer) {
    if (this.loguedUser != null) {
      this.modalService.open(modal, {centered: true, backdropClass: 'modal-backdrop-chachiguay', size: 'lg'});
      this.valorationStarts = 5;
      this.usernameOrganizer = usernameOrganizer;

    }
  }

  public onSubmit(f: NgForm) {

    this.valoracionNueva = new Valoracion();
    this.valoracionNueva.puntuacion = this.valorationStarts;
    this.valoracionNueva.comentario = f.value.comentario;
    this.valoracionNueva.valorado = this.usernameOrganizer;
    this.valoracionNueva.valorador = this.loguedUser.username;


    this.userService.postAddValoration(this.valoracionNueva).subscribe(res => {
        this.ngOnInit();
      }
    );


    this.modalService.dismissAll();
    this.snackBar.open('Comentario reguistado con éxito', 'Cerrar', {duration: 3000});

  }

  openListValorationModal(modalPuntuacionArtista: any, usernameOrganizer: string) {

    this.userService.getUserByUsername(usernameOrganizer).subscribe(user => {
      this.listValoraciones = user.valoraciones;
      this.modalService.open(modalPuntuacionArtista, {centered: true, backdropClass: 'modal-backdrop-chachiguay', size: 'lg'});

    });
  }

  public completeContract(contract) {
    contract.state = 'DONE';
    this.contractService.completeContract(contract.id).subscribe(this.successSubscriber, this.errorSubscriber);
  }

  public openEditValorationModal(modalPuntuacionArtista: any, valoracion: Valoracion) {

    if (this.loguedUser != null) {
      this.valorationStarts = valoracion.puntuacion;
      this.valorationEditar = valoracion;
      this.modalService.open(modalPuntuacionArtista, {
        centered: true,
        backdropClass: 'modal-backdrop-chachiguay',
        size: 'lg'
      });
    }
  }

  onSubmitEdit(f: NgForm) {

    this.valoracionNueva = this.valorationEditar;
    this.valoracionNueva.id = this.valorationEditar.id;
    this.valoracionNueva.puntuacion = this.valorationStarts;
    this.valoracionNueva.comentario = f.value.comentario;
    this.valoracionNueva.valorado = this.valorationEditar.valorado;
    this.valoracionNueva.valorador = this.loguedUser.username;

    console.log('ewrewrwrw');
    console.log(this.valoracionNueva.id);

    this.userService.postEditValoracion(this.valoracionNueva).subscribe(res => {
        this.ngOnInit();
        this.modalService.dismissAll();
        this.snackBar.open('Comentario editado con éxito', 'Cerrar', {duration: 3000});
      }
    );

  }


}
