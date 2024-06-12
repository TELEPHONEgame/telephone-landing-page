export type SignUpFormType = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  hometown: string;
  artForm: string;
  abstract: string;
  samples: Samples;
};

type Samples = Sample[];

type Sample = {
  name: string;
  // file: File | Blob | string;
  file: any;
  mediaLink: string;
  error: string;
};

export enum ArtForm {
  Drawing = "Drawing",
  Film = "Film",
  Music = "Music",
  Literature = "Literature",
  Painting = "Painting",
  Dance = "Dance",
}