import {Component, Input, OnInit} from '@angular/core';
import {Artist} from '../../model/Artist';

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

  constructor() { }

  ngOnInit() {
    console.log(this.artist);
  }

}
