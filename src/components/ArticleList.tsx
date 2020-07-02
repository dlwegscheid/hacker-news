import React, {useContext} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {getStoryDetails} from '../services/hackerNewsApi';
import {StoriesContext, Action, IStoryData} from '../contexts/StoriesProvider';

const loadFunc = (stories: IStoryData, dispatch: React.Dispatch<Action>) => async (index: number) => {
  const newStory = await getStoryDetails(stories.allIds[index - 1]);
  dispatch({type: 'addStoryDetails', newStory});
}

export default function ArticleList() {
  const {stories, dispatch} = useContext(StoriesContext);

  return <ol>
    {stories.allIds.length > 0 && <InfiniteScroll
      pageStart={stories.details.length}
      loadMore={loadFunc(stories, dispatch)}
      hasMore={stories.details.length < 500}
      loader={<div className="loader" key={0}>Loading...</div>}
    >
      {stories.details.map(s => <li key={s.id}>{s.id} - {s.title} - {s.url}</li>)}
    </InfiniteScroll>
    }
  </ol>
}