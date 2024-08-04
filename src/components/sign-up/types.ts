export type SignUpFormType = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  city_lat: number;
  city_long: number;
  home_country: string | null;
  home_city: string | null;
  home_city_lat: number | null;
  home_city_long: number | null;
  artForm: string;
  abstract: string;
  samples: Samples;
};

type Samples = Sample[];

type Sample = {
  name: string;
  file: File | null;
  // file: any;
  mediaLink: string;
};

export enum ArtForm {
  Drawing = "Drawing",
  Film = "Film",
  Music = "Music",
  Literature = "Literature",
  Painting = "Painting",
  Dance = "Dance",
  Photography = "Photography",
  Sculpture = "Sculpture",
  DigitalArt = "Digital Art",
}
