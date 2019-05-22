export class Contract {
  id: number;
  artisticUsername: string;
  organizerUsername: string;
  zone = '';
  location = '';
  comments: string;
  date: number;
  limitDate: number;
  state: 'ACCEPTED' | 'REJECTED' | 'DONE' | 'ACCEPTANCE_PENDING' | 'CANCELLED' | 'RECLAMATION';
  haSidoValorado: boolean;
}
