import {Contract} from './Contract';
import {Valoracion} from './Valoracion';

export class Artist {
  username: string;
  artisticName: string;
  description: string;
  price: number;
  puntuation: number;
  valoraciones: Array<Valoracion>;
  habilities: Array<string>;
  images: Array<Image>;
  videos: Array<Video>;
  zones: Array<string>;
  schedules: Array<string>;
  contracts: Array<Contract>;
}

export class Video {
  id: number;
  name: string;
  video: string;
}

export class Image {
  id: number;
  name: string;
  image: string;
}
