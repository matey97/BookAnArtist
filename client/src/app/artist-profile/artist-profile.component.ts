import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {ArtistService} from '../shared/artist/artist.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {User} from '../model/User';
import {Artist, Image, Video} from '../model/Artist';
import {LoginService} from '../shared/loginService/login.service';

export const ZONES = ['Álava', 'Albacete', 'Alicante', 'Almeria', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cadiz',
  'Cantabria', 'Castellón', 'Ceuta', 'Ciudad real', 'Cordoba', 'Cuenca', 'Girona', 'Las palmas de Gran Canaria', 'Granada', 'Guadalajara',
  'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'A Coruña', 'La Rioja', 'León', 'Lleida', 'Lugo', 'Madrid', 'Malaga', 'Melilla',
  'Murcia', 'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Santa cruz de Tenerife',
  'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'];

export const HABILITIES = ['Músico', 'Grupo musical', 'Banda', 'DJ', 'Mago', 'Animador', 'Cómico'];

export const SCHEDULES = ['Mañana', 'Tarde', 'Noche'];

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrls: ['./artist-profile.component.scss']
})
export class ArtistProfileComponent implements OnInit {

  habilities = HABILITIES;
  schedules = SCHEDULES;

  myControl: FormControl;
  filteredZones: Observable<string[]>;

  user;
  artist: Artist;
  firstTime = false;
  editMode = false;

  constructor(private userService: UserService,
              private artistService: ArtistService,
              private snackBar: MatSnackBar,
              private loginService: LoginService) { }

  ngOnInit() {
    const user = this.loginService.getLoguedUser(this).subscribe(user => {
      if (user !== null) {
        this.user = user;
        this.artistService.getArtistByUsername(this.user.username).subscribe(artist => {
          if (artist.username == null) {
            this.firstTime = true;
            artist.username = user.username;
          }
          this.artist = artist;
          this.myControl = new FormControl({value: '', disabled: !this.firstTime});
          this.applyFilter();
        });
      }
    });
  }

  public changeEditMode(mode: boolean) {
    this.editMode = mode;
    this.myControl = new FormControl({value: '', disabled: !mode});
    this.applyFilter();
  }

  private applyFilter() {
    this.filteredZones = this.myControl.valueChanges.pipe(
      startWith(''),
      map(formState => this.filter(formState))
    );
  }

  public saveArtisticProfileChanges(myForm) {
    console.log(this.artist);
    this.changeEditMode(false);
    this.firstTime = false;

    this.artistService.postArtistProfile(this.artist).subscribe(() => {
      console.log('Exito');
      this.snackBar.open('Datos actualizados correctamente', 'Cerrar', {duration: 3000});
    },
      error1 => {
      console.log('Error');
      this.snackBar.open('Ha ocurrido un error', 'Cerrar', {duration: 3000});
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

  public zoneChange(zone: any) {
    this.artist.zones.push(zone.option.value);
    this.myControl.setValue('');
  }

  public resetVideosAndImages() {
    this.artist.images = [];
    this.artist.videos = [];
    this.artist.zones = [];
    console.log(this.artist);
  }

  public removeImage(image: Image) {
    this.artist.images = this.artist.images.filter(item => item !== image);
    console.log(this.artist.images);
  }

  public removeVideo(video: Video) {
    this.artist.videos = this.artist.videos.filter(item => item !== video);
  }

  public removeZone(zone: string) {
    this.artist.zones = this.artist.zones.filter(item => item !== zone);
  }

  private filter(value): string[] {
    const filterValue = value.toLowerCase();
    return ZONES.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
