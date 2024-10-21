export interface Submission {
  id: number;
  file: string;
  type: "audio" | "image" | "video" | "file";
}

export interface Artist {
  id: number;
  first_name: string;
  last_name: string;
  accepted: Date;
  due: Date;
  parent: Artist;
  submissions: Array<Submission>;
}

export interface Countdown {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}
