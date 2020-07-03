import React, {Context, createContext, useReducer, useEffect} from 'react';
import {getStoryList, getStoryDetails} from '../services/hackerNewsApi';
import {FullStory, StoryDetails} from '../types';
import {useInterval} from '../useInterval';

export const LS_KEY = 'HackerNewsStories1';

type StoriesContext = {
  stories: FullStory[];
  dispatch: React.Dispatch<Action>;
}

const StoriesContext: Context<StoriesContext> = createContext(
  {} as StoriesContext
);

export type Action =
  | {type: 'newList'; newIds: number[]}
  | {type: 'addStoryDetails'; newStory: StoryDetails}
  | {type: 'removeStory'; id: number}

const reducer = (state: FullStory[], action: Action): FullStory[] => {
  switch (action.type) {
    case 'newList': {
      return state[0]?.id === action.newIds[0] || !action.newIds.length ? state : action.newIds.map(id => ({id, details: state.find(s => s.id === id)?.details}));
    }
    case 'addStoryDetails': {
      return !action.newStory.id ? state : state.map(s => s.id === action.newStory.id ? {...s, details: action.newStory} : s);
    }
    case 'removeStory': {
      return state.filter(s => s.id !== action.id);
    }
    default: {
      return state;
    }
  }
};

const getNewStories = (dispatch: (action: Action) => void) => {
  (async () => {
    const storyIds = await getStoryList();
    dispatch({type: 'newList', newIds: storyIds});
  })();
};

const initialState = JSON.parse(localStorage.getItem(LS_KEY) as string) || [];

const StoriesProvider: React.FC<Props> = ({children}: Props) => {
  const [stories, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getNewStories(dispatch);
  }, []);

  useInterval(() => {
    getNewStories(dispatch);
  }, 60000);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(stories));

    (async () => {
      if (stories.some(s => s.details)) {
        for (const story of stories) {
          if (story.details) {
            break;
          }
          const newStory = await getStoryDetails(story.id);
          dispatch({type: 'addStoryDetails', newStory});
        }
      }
    })();
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

type Props = {
  children: React.ReactNode;
}

export {StoriesProvider, StoriesContext};