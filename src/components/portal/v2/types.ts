export interface Submission {
  readonly dimensions: string;
  readonly id: number;
  readonly file: string;
  readonly focal_x: number;
  readonly focal_y: number;
  readonly materials: string;
  readonly order: number;
  readonly title: string;
  readonly type: "audio" | "image" | "video" | "file";
  readonly written_work: string;
  readonly written_work_line_wrap_disabled: boolean
}

export type MutableSubmissionFields = Pick<
  Submission,
  | "dimensions"
  | "id"
  | "focal_x"
  | "focal_y"
  | "materials"
  | "order"
  | "title"
  | "written_work"
  | "written_work_line_wrap_disabled"
>;

export interface Artist {
  readonly accepted: Date;
  readonly completed: string;
  readonly due: string;
  readonly first_name: string;
  readonly id: number;
  readonly last_name: string;
  readonly parent: Artist;
  readonly submissions: Array<Submission>;
  readonly submitted: string;
}

export type MutableArtistFields = Pick<
  Artist,
  | "submitted"
>

export interface Countdown {
  readonly days: number;
  readonly hours: number;
  readonly mins: number;
  readonly secs: number;
}
