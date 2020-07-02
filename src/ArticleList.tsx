import React, {useContext} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {StoriesContext, IStory, Action, IStoryData} from './StoriesProvider';

const loadFunc = (stories: IStoryData, dispatch: React.Dispatch<Action>) => async (index: number) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${stories.allIds[index - 1]}.json`);
  const newStory: IStory = await response.json();
  dispatch({type: 'addStoryDetails', newStory});
}

export default function ArticleList() {
  const {stories, dispatch} = useContext(StoriesContext);
  !!stories.allIds && console.log(stories);
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