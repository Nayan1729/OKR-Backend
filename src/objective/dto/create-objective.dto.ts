export class CreateObjectiveDto {
  title: string;
  description: string;
  keyResults?: { description: string; targetProgress: number }[];
}
