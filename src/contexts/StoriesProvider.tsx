import React, {Context, createContext, useReducer, useEffect} from "react";
import {getStoryList} from '../services/hackerNewsApi';
import {Story} from '../types/story';

const LS_KEY = 'HackerNewsStories';

export interface IStoryData {
  details: Story[];
  allIds: number[];
}

type IStoriesContext = {
  stories: IStoryData;
  dispatch: React.Dispatch<Action>;
}

const StoriesContext: Context<IStoriesContext> = createContext(
  {} as IStoriesContext
);

export type Action =
  | {type: 'newList', newIds: number[]}
  | {type: 'addStoryDetails', newStory: Story}

const reducer = (state: IStoryData, action: Action): IStoryData => {
  console.log(action);
  switch (action.type) {
    case 'newList': {
      return {
        ...state,
        allIds: action.newIds,
        details: state.details.filter(s => action.newIds.includes(s.id))
      }
    }
    case 'addStoryDetails': {
      const currentIndex = state.details.findIndex(s => s.id === action.newStory.id);
      return {
        ...state,
        details: currentIndex < 0 ? [action.newStory, ...state.details].sort((s1, s2) => s2.id - s1.id) : [...state.details]
      }
    }
    default: {
      return state;
    }
  }
};

const initialState =
  JSON.parse(localStorage.getItem(LS_KEY) as string) || {details: [], allIds: []} as IStoryData;

const StoriesProvider: React.FC = ({children}) => {
  const [stories, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchIds = async () => {
      const storyIds = await getStoryList();
      dispatch({type: 'newList', newIds: storyIds})
    };

    fetchIds();
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