import {Component, OnInit, ViewChild} from '@angular/core';
import {ContractService} from '../shared/contract/contract.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../shared/user/user.service';
import {User} from '../model/User';
import {Contract} from '../model/Contract';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {LoginService} from '../shared/loginService/login.service';

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

  currentDate: Date;
  isArtist: boolean;

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
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.loguedUser = this.loginService.getLoguedUser();
    if (this.loguedUser.usertype === 'ARTIST') {
      this.isArtist = true;
      this.contractService.getArtistContracts(this.loguedUser.username).subscribe(contracts => {
        this.contracts = contracts;
        this.displayedColumns = this.artistDisplayedColumns;
        this.configureDataSource(this.contracts);
        this.configureTablePaginatorAndSorting();
      });
    } else {
      this.isArtist = false;
      this.contractService.getOrganizerContracts(this.loguedUser.username).subscribe(contracts => {
        this.contracts = contracts;
        this.displayedColumns = this.organizerDisplayedColumns;
        this.configureDataSource(this.contracts);
        this.configureTablePaginatorAndSorting();
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

  public completeContract(contract) {
    contract.state = 'DONE';
    this.contractService.completeContract(contract.id).subscribe(this.successSubscriber, this.errorSubscriber);
  }
}
