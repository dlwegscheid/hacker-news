import React, {Context, createContext, useReducer, useEffect} from "react";
import {getStoryList} from '../services/hackerNewsApi';
import {StoryModel} from '../types/story';

export const LS_KEY = 'HackerNewsStories';

type IStoriesContext = {
  stories: Map<number, StoryModel | undefined>;
  dispatch: React.Dispatch<Action>;
}

const StoriesContext: Context<IStoriesContext> = createContext(
  {} as IStoriesContext
);

export type Action =
  | {type: 'newList', newIds: number[]}
  | {type: 'addStoryDetails', newStory: StoryModel}

const reducer = (state: Map<number, StoryModel | undefined>, action: Action): Map<number, StoryModel | undefined> => {
  console.log(state, action);
  switch (action.type) {
    case 'newList': {
      return new Map(action.newIds.map(id => [id, state.get(id)]))
    }
    case 'addStoryDetails': {
      const newStories = new Map(state);
      newStories.set(action.newStory.id, action.newStory)
      return newStories
    }
    default: {
      return state;
    }
  }
};

const initialState =
  new Map<number, StoryModel | undefined>(JSON.parse(localStorage.getItem(LS_KEY) as string)) || new Map();

const StoriesProvider: React.FC = ({children}) => {
  const [stories, dispatch] = useReducer(reducer, initialState);
  console.log('storieschanged?');
  useEffect(() => {
    const fetchIds = async () => {
      const storyIds = await getStoryList();
      dispatch({type: 'newList', newIds: storyIds})
    };

    fetchIds();
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(stories)));
    console.log('saving')
  }, [stories]);

  return (
    <StoriesContext.Provider
      value={{
        stories,
        dispatch,
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
};

export {StoriesProvider, StoriesContext};