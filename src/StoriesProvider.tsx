import React, {Context, createContext, useReducer, useEffect} from "react";
import {useDatabase, useDatabaseListData} from 'reactfire';

const LS_KEY = 'HackerNewsStories';

interface IStory {
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

interface IStoryData {
  stories: IStory[];
  allIds: number[];
}

interface IStoriesContext {
  stories: IStoryData;
  dispatch: React.Dispatch<any>;
}

const StoriesContext: Context<IStoriesContext> = createContext(
  {} as IStoriesContext
);

type Action =
  | {type: 'newList', newIds: number[]}
  | {type: 'addStoryDetails', newStory: IStory}

const reducer = (state: IStoryData, action: Action): IStoryData => {
  switch (action.type) {
    case 'newList': {
      return {
        allIds: action.newIds,
        stories: state.stories.filter(s => action.newIds.includes(s.id))
      }
    }
    default: {
      return state;
    }
  }
};

const initialState: IStoryData =
  JSON.parse(localStorage.getItem(LS_KEY) as string) || {stories: [], allIds: []};

const StoriesProvider: React.FC = ({children}) => {
  const [stories, dispatch] = useReducer(reducer, initialState);

  const storyListRef = useDatabase().ref('v0/newstories');
  const storyIds = useDatabaseListData(storyListRef, {startWithValue: stories.allIds}) as number[];

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    dispatch({type: 'newList', newIds: storyIds})
  }, [storyIds])

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