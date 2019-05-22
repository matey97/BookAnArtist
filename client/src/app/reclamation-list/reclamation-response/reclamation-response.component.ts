import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Reclamation, ReclamationResponse} from '../../model/Reclamation';
import {Image, Video} from '../../model/Artist';


@Component({
  selector: 'app-reclamation-response',
  templateUrl: './reclamation-response.component.html',
  styleUrls: ['./reclamation-response.component.scss']
})
export class ReclamationResponseComponent implements OnInit {

  @Input()
  reclamation: Reclamation;
  @Input()
  readonly: boolean;
  @Output()
  updated = new EventEmitter<Reclamation>();

  firstTime = false;
  editingMode = false;

  constructor() { }

  ngOnInit() {
    if (this.reclamation.reclamationResponse == null) {
      this.firstTime = true;
      this.reclamation.reclamationResponse = new ReclamationResponse();
      this.reclamation.reclamationResponse.id = -1;
      this.reclamation.reclamationResponse.response = '';
      this.reclamation.reclamationResponse.videos = new Array<Video>();
      this.reclamation.reclamationResponse.images = new Array<Image>();
    }
  }

  public videoChange(fileInput: any) {
    let name;
    const videosReader = new FileReader();
    videosReader.onload = ((e) => {
      this.reclamation.reclamationResponse.videos.push({
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
      this.reclamation.reclamationResponse.images.push({
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

  public removeVideo(video) {
    this.reclamation.reclamationResponse.videos = this.reclamation.reclamationResponse.videos.filter(item => item !== video);
  }

  public removeImage(image) {
    this.reclamation.reclamationResponse.images = this.reclamation.reclamationResponse.images.filter(item => item !== image);
  }

  private validData(): boolean {
    const response: ReclamationResponse = this.reclamation.reclamationResponse;
    if (response.response.length === 0 || (response.images.length === 0 && response.videos.length === 0)) {
      return false;
    }
    return true;
  }

  public updateResponse() {
    this.updated.emit(this.reclamation);
    this.editingMode = false;
    this.firstTime = false;
  }
}
