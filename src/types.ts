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

export const nullStoryDetailsFactory = (override?: Partial<StoryDetails>): StoryDetails => Object.assign({
  by: '',
  id: 0,
  score: 0,
  descendants: 0,
  kids: [],
  time: 0,
  title: '',
  type: '',
  url: ''
}, override);

export type FullStory = {
  id: number;
  details?: StoryDetails;
}