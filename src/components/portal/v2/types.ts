export interface Submission {
  readonly dimensions: string;
  readonly id: number;
  readonly file: string;
  readonly focal_x: number;
  readonly focal_y: number;
  readonly materials: string;
  readonly title: string;
  readonly type: "audio" | "image" | "video" | "file";
}

export interface Artist {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly accepted: Date;
  readonly due: Date;
  readonly parent: Artist;
  readonly submissions: Array<Submission>;
}

export interface Countdown {
  readonly days: number;
  readonly hours: number;
  readonly mins: number;
  readonly secs: number;
}
