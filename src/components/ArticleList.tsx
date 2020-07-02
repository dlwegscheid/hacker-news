import React, {useContext} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {getStoryDetails} from '../services/hackerNewsApi';
import {StoriesContext, Action} from '../contexts/StoriesProvider';
import Story from './Story';
import {StoryModel} from '../types/story';

const loadFunc = (stories: Map<number, StoryModel | undefined>, dispatch: React.Dispatch<Action>) => async (index: number) => {
  const newStory = await getStoryDetails(Array.from(stories.keys())[index - 1]);
  dispatch({type: 'addStoryDetails', newStory});
}

export default function ArticleList() {
  const {stories, dispatch} = useContext(StoriesContext);
  console.log(stories);
  const details = Array.from(stories.values()).filter(v => v) as StoryModel[];

  return <ol>
    {stories.size > 0 && <InfiniteScroll
      pageStart={0}
      loadMore={loadFunc(stories, dispatch)}
      hasMore={details.length < 500}
      loader={<div className="loader" key={0}>Loading...</div>}
    >
      {details.map(s => <Story story={s}></Story>)}
    </InfiniteScroll>
    }
  </ol>
}