import {Contract} from './Contract';

export class Artist {
  username: string;
  artisticName: string;
  description: string;
  price: number;
  puntuation: number;
  nPuntuations: number;
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
