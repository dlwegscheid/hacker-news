export type StoryModel = {
  by: string;
  id: number;
  score: number;
  descendants: number;
  kids: number[];
  time: number;
  title: string;
  type: string;
  url: string;
}