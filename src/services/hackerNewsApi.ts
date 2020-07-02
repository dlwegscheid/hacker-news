import {IStory} from '../contexts/StoriesProvider';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export const getStoryDetails = async (storyId: number) => {
  const response = await fetch(`${baseUrl}/item/${storyId}.json`);
  return await response.json() as IStory;
}

export const getStoryList = async () => {
  const response = await fetch(`${baseUrl}/newstories.json`);
  return await response.json() as number[];
}