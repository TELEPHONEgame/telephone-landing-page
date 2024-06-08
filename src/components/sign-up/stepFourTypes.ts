export type FormType = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  hometown: string;
  artForm: string;
  abstract: number;
  samples: Samples;
};

type Samples = Sample[];

type Sample = {
  name: string;
  file: File | null;
  mediaLink: string;
};
