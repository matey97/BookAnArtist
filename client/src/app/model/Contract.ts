export class Contract {
  id: number;
  artisticUsername: string;
  organizerUsername: string;
  zone: string;
  location: string;
  comments: string;
  date: number;
  state: 'ACCEPTED' | 'REJECTED' | 'DONE' | 'ACCEPTANCE_PENDING';
}
