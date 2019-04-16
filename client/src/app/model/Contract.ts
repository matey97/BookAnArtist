export class Contract {
  id: number;
  artisticUsername: string;
  organizerUsername: string;
  zone: string;
  location: string;
  comments: string;
  date: number;
  limitDate: number;
  state: 'ACCEPTED' | 'REJECTED' | 'DONE' | 'ACCEPTANCE_PENDING' | 'CANCELLED';
  haSidoValorado: boolean;
}
