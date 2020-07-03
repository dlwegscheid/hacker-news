import {StoryDetails, nullStoryDetailsFactory} from '../types';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

export const getStoryDetails = async (storyId: number): Promise<StoryDetails> => {
  try {
    const response = await fetch(`${baseUrl}/item/${storyId}.json`);
    return await response.json() as StoryDetails;
  } catch {
    return nullStoryDetailsFactory();
  }
};

export const getStoryList = async (): Promise<number[]> => {
  try {
    const response = await fetch(`${baseUrl}/newstories.json`);
    return await response.json() as number[];
  } catch {
    return [];
  }
};