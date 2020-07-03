import React, {Context, createContext, useReducer, useEffect} from "react";
import {getStoryList} from '../services/hackerNewsApi';
import {FullStory, StoryDetails} from '../types';

export const LS_KEY = 'HackerNewsStories1';

type IStoriesContext = {
  stories: FullStory[],
  dispatch: React.Dispatch<Action>;
}

const StoriesContext: Context<IStoriesContext> = createContext(
  {} as IStoriesContext
);

export type Action =
  | {type: 'newList', newIds: number[]}
  | {type: 'addStoryDetails', newStory: StoryDetails}
  | {type: 'removeStory', id: number}

const reducer = (state: FullStory[], action: Action): FullStory[] => {
  console.log(state, action);
  switch (action.type) {
    case 'newList': {
      return state[0]?.id === action.newIds[0] ? state : action.newIds.map(id => ({id, details: state.find(s => s.id === id)?.details}));
    }
    case 'addStoryDetails': {
      return state.map(s => s.id === action.newStory.id ? {...s, details: action.newStory} : s);
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
}

const initialState = JSON.parse(localStorage.getItem(LS_KEY) as string) || [];

const StoriesProvider: React.FC = ({children}) => {
  const [stories, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getNewStories(dispatch);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(stories));
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