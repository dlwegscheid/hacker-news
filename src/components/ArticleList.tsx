import React, {useContext, useMemo} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import {Loading} from '@doist/reactist'
import {getStoryDetails} from '../services/hackerNewsApi';
import {StoriesContext, Action} from '../contexts/StoriesProvider';
import Story from './Story';
import {FullStory, StoryDetails} from '../types';

const ListWrapper = styled.main`
  background-color: #F5F6F8;
  padding 1rem 2rem;
`;

const LoadingWrapper = styled.div`
  margin: 1rem;
`;

const loadNextStory = (stories: FullStory[], dispatch: React.Dispatch<Action>) => async (_: number) => {
  const nextMissingStory = stories.find(s => !s.details);
  if (nextMissingStory) {
    const newStory = await getStoryDetails(nextMissingStory.id);
    dispatch(newStory ? {type: 'addStoryDetails', newStory} : {type: 'removeStory', id: nextMissingStory.id});
  }
}

export default function ArticleList() {
  const {stories, dispatch} = useContext(StoriesContext);
  const details = useMemo(() => stories.filter(s => s.details).map(s => s.details) as StoryDetails[], [stories]);

  return <ListWrapper>
    <ol>
      {stories.length > 0 && <InfiniteScroll
        pageStart={0}
        loadMore={loadNextStory(stories, dispatch)}
        hasMore={details.length < stories.length}
        loader={<div className="loader" key={0}><LoadingWrapper><Loading /></LoadingWrapper></div>}
      >
        {details.map(s => <Story key={s.id} story={s}></Story>)}
      </InfiniteScroll>
      }
    </ol>
  </ListWrapper>
}