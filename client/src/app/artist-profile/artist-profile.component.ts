import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {ArtistService} from '../shared/artist/artist.service';

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

  constructor(private userService: UserService,
              private artistService: ArtistService) { }

  ngOnInit() {
    this.userService.getMockLoguedUser().subscribe(user => {
      this.user = user;
      this.artistService.getArtistByUsername(this.user.username).subscribe(artist => {
        if (artist.username == null) {
          this.firstTime = true;
          artist.username = user.username;
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

    this.artistService.postArtistProfile(this.artist).subscribe(() => {
      console.log('Exito');
    },
      error1 => {
      console.log('Error');
    });
  }

  public videoChange(fileInput: any) {
    let name;
    const videosReader = new FileReader();
    videosReader.onload = ((e) => {
      // this.videosLoaded = this.videosLoaded.concat(e.target['result'].split(',')[1]);
      this.artist.videos.push({
        id: -1,
        name,
        video: e.target['result'].split(',')[1]});
    });
    if (fileInput.target.files) {
      for (const video of fileInput.target.files) {
        // this.videosFile = this.videosFile.concat(video);
        name = video.name;
        videosReader.readAsDataURL(video);
      }
    }
  }

  public imageChange(fileInput: any) {
    let name;
    const imagesReader = new FileReader();
    imagesReader.onload = ((e) => {
      this.artist.images.push({
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

  public resetVideosAndImages() {
    this.artist.images = [];
    this.artist.videos = [];
  }

  public removeImage(image: string) {
    this.artist.images = this.artist.images.filter(item => item !== image);
    console.log(this.artist.images);
  }

  public removeVideo(video: string) {
    this.artist.videos = this.artist.videos.filter(item => item !== video);
  }
}
