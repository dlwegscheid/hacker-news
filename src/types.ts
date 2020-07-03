export type StoryDetails = {
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

export type FullStory = {
  id: number;
  details?: StoryDetails;
}