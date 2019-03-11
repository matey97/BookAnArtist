export class Artist {
  username: string;
  artisticName: string;
  description: string;
  puntuation: number;
  nPuntuations: number;
  habilities: Array<string>;
  images: Array<Image>;
  videos: Array<Video>;
  zones: Array<string>;
  schedules: Array<string>;
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
