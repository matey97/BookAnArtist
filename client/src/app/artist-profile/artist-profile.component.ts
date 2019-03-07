import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {ArtistService} from '../shared/artist/artist.service';
import {Observable} from 'rxjs';
import {MultimediaService} from '../shared/multimedia/multimedia.service';
import {MatDialog} from '@angular/material';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.css']
})
export class ArtistProfileComponent implements OnInit {

  user;
  artist;
  habilities = ['Músico', 'Mago', 'DJ', 'Banda', 'Narcoterrorista', 'Cómico'];
  firstTime = false;
  editMode = false;

  videosFile = [];
  videosLoaded = [];
  imagesFile = [];
  imagesLoaded = [];

  constructor(private userService: UserService,
              private artistService: ArtistService,
              private multimediaService: MultimediaService) { }

  ngOnInit() {
    this.userService.getMockLoguedUser().subscribe(user => {
      this.user = user;
      this.artistService.getArtistByUsername(this.user.username).subscribe(artist => {
        if (artist.username == null) {
          this.firstTime = true;
          artist.username = user.username;
        } else {
          artist.images.forEach( id => {
            this.multimediaService.getImage(id).subscribe(data => {
              this.imagesFile.push({
                name: data.name
              });
              this.imagesLoaded.push(data.image);
            });
          });
          artist.rawVideos = [];
          artist.videos.forEach( id => {
            this.multimediaService.getVideo(id).subscribe( data => {
              this.videosFile.push({
                name: data.name
              });
              this.videosLoaded.push(data.video);
            });
          });
        }
        this.artist = artist;
        this.userService.getProfileImage(this.user.username).subscribe(image => {
          this.user.rawImage = image.raw;
        });
      });
    });
  }

  public changeEditMode(mode: boolean) {
    this.editMode = mode;
  }

  public saveArtisticProfileChanges(myForm) {
    console.log('Save llamado');
    this.changeEditMode(false);
    this.firstTime = false;

    const imagesArray = new Array(this.imagesFile.length);
    this.imagesFile.forEach((item, index) => {
      imagesArray[index] = {
        name: item.name,
        base64: this.imagesLoaded[index]
      };
    });

    const videosArray = new Array(this.videosFile.length);
    this.videosFile.forEach((item, index) => {
      videosArray[index] = {
        name: item.name,
        base64: this.videosLoaded[index]
      };
    });

    this.artistService.postArtistProfile(this.artist, imagesArray, videosArray).subscribe(() => {
      console.log('Exito');
    },
      error1 => {
      console.log('Error');
    });
  }

  public videoChange(fileInput: any) {
    const videosReader = new FileReader();
    videosReader.onload = ((e) => {
      this.videosLoaded = this.videosLoaded.concat(e.target['result'].split(',')[1]);
    });
    if (fileInput.target.files) {
      for (const video of fileInput.target.files) {
        this.videosFile = this.videosFile.concat(video);
        videosReader.readAsDataURL(video);
      }
    }
  }

  public imageChange(fileInput: any) {
    if (fileInput.target.files) {
      for (const image of fileInput.target.files) {
        const imagesReader = new FileReader();
        imagesReader.onload = ((e) => {
          this.imagesLoaded = this.imagesLoaded.concat(e.target['result'].split(',')[1]);
        });
        this.imagesFile = this.imagesFile.concat(image);
        imagesReader.readAsDataURL(image);
      }
    }
  }

  public resetVideosAndImages() {
    this.imagesFile = [];
    this.imagesLoaded = [];
    this.videosFile = [];
    this.videosLoaded = [];
  }

  public removeImage(name: string) {
    const index = this.imagesFile.indexOf(name);
    this.imagesFile = this.imagesFile.filter(item => item !== name);
    this.imagesLoaded.splice(index, 1);
  }

  public removeVideo(name: string) {
    const index = this.videosFile.indexOf(name);
    this.videosFile = this.videosFile.filter(item => item !== name);
    this.videosLoaded.splice(index, 1);

  }
}
