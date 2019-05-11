import {Component, Input, OnInit} from '@angular/core';
import {Artist, Image, Video} from '../../model/Artist';
import {Contract} from '../../model/Contract';
import {Reclamation} from '../../model/Reclamation';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ReclamationService} from '../../shared/reclamation/reclamation.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent implements OnInit {

  @Input()
  contract: Contract;
  @Input()
  modal;
  @Input()
  loguedUser;
  @Input()
  isArtist: boolean;

  reclamation: Reclamation;

  constructor(private modalService: NgbModal,
              private reclamationService: ReclamationService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.reclamation = new Reclamation();
    this.reclamation.images = new Array<Image>();
    this.reclamation.videos = new Array<Video>();
  }

  askConfirmation(confModal) {
    this.modalService.open(confModal, {centered: true, backdropClass: 'modal-backdrop-chachiguay'});
  }

  public videoChange(fileInput: any) {
    let name;
    const videosReader = new FileReader();
    videosReader.onload = ((e) => {
      // this.videosLoaded = this.videosLoaded.concat(e.target['result'].split(',')[1]);
      this.reclamation.videos.push({
        id: -1,
        name,
        video: e.target['result'].split(',')[1]});
    });
    if (fileInput.target.files) {
      for (const video of fileInput.target.files) {
        name = video.name;
        videosReader.readAsDataURL(video);
      }
    }
  }

  public imageChange(fileInput: any) {
    let name;
    const imagesReader = new FileReader();
    imagesReader.onload = ((e) => {
      this.reclamation.images.push({
        id: -1,
        name,
        image: e.target['result'].split(',')[1]
      });
    });
    if (fileInput.target.files) {
      for (const image of fileInput.target.files) {
        name = image.name;
        imagesReader.readAsDataURL(image);
      }
    }
  }

  public removeImage(image: Image) {
    this.reclamation.images = this.reclamation.images.filter(item => item !== image);
  }

  public removeVideo(video: Video) {
    this.reclamation.videos = this.reclamation.videos.filter(item => item !== video);
  }

  public saveReclamation(modalRef) {
    this.reclamation.id = -1;
    this.reclamation.state = null;
    this.reclamation.reclamedUser = this.isArtist ? this.contract.organizerUsername : this.contract.artisticUsername;
    this.reclamation.reclamingUser = this.isArtist ? this.contract.artisticUsername : this.contract.organizerUsername;
    this.reclamation.contractId = this.contract.id;
    this.reclamation.creationDate = new Date().getTime();
    this.reclamation.updateDate = null;
    console.log(this.reclamation);

    this.reclamationService.postReclamation(this.reclamation).subscribe((success) => {
      if (success) {
        this.contract.state = 'RECLAMATION';
        this.snackBar.open('Petición completada. Se ha enviado una reclamacion al artista que será tratada por los administradores.', 'Cerrar', {duration: 3000});
      } else {
        this.snackBar.open('No se ha podido tratar tu petición.', 'Cerrar', {duration: 3000});
      }
    }, error => {
      this.snackBar.open('Ha ocurrido un error', 'Cerrar', {duration: 3000});
    });
    modalRef.close();
    this.modal.close();
  }
}
