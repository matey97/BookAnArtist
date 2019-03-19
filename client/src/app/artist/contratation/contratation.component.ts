import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../model/Artist';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {ZONES} from '../../artist-profile/artist-profile.component';

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

  constructor() { }

  ngOnInit() {
    console.log(this.artist);
    console.log(this.modal);
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
}
