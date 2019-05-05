import {Image, Video} from './Artist';

export class Reclamation {
  id: number;
  reclamingUser: string;
  reclamedUser: string;
  reclamation: string;
  creationDate: number;
  updateDate: number;
  state: 'OPEN' | 'CLOSED' | 'ACCEPTED';
  images: Array<Image>;
  videos: Array<Video>;
}
