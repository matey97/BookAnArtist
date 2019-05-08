import {Image, Video} from './Artist';

export class Reclamation {
  id: number;
  contractId: number;
  reclamingUser: string;
  reclamedUser: string;
  reclamation: string;
  creationDate: number;
  updateDate: number;
  state: 'OPEN' | 'CLOSED' | 'ACCEPTED' | 'CANCELLED';
  images: Array<Image>;
  videos: Array<Video>;
}
