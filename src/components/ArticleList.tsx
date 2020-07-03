import React, {useContext} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import {Loading} from '@doist/reactist'
import {getStoryDetails} from '../services/hackerNewsApi';
import {StoriesContext, Action} from '../contexts/StoriesProvider';
import Story from './Story';
import {StoryModel} from '../types/story';

const ListWrapper = styled.main`
  background-color: #F5F6F8;
  padding 1rem 2rem;
`;

const LoadingWrapper = styled.div`
  margin: 1rem;
`;

const loadFunc = (stories: Map<number, StoryModel | undefined>, dispatch: React.Dispatch<Action>) => async (index: number) => {
  const newStory = await getStoryDetails(Array.from(stories.keys())[index - 1]);
  dispatch({type: 'addStoryDetails', newStory});
}

export default function ArticleList() {
  const {stories, dispatch} = useContext(StoriesContext);
  const details = Array.from(stories.values()).filter(v => v) as StoryModel[];

  return <ListWrapper>
    <ol>
      {stories.size > 0 && <InfiniteScroll
        pageStart={0}
        loadMore={loadFunc(stories, dispatch)}
        hasMore={details.length < 500}
        loader={<div className="loader" key={0}><LoadingWrapper><Loading /></LoadingWrapper></div>}
      >
        {details.map(s => <Story key={s.id} story={s}></Story>)}
      </InfiniteScroll>
      }
    </ol>
  </ListWrapper>
}