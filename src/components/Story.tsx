import React from 'react';
import styled from 'styled-components';
import {Time} from '@doist/reactist';
import {StoryDetails} from '../types';

type StoryProps = {
  story: StoryDetails;
}

const Item = styled.li`
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const ArticleLink = styled.a`
  text-decoration: none;
  color: inherit;

  &:visited {
    color: #4F636E;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const createHackerNewsUrl = (id: number) => `https://news.ycombinator.com/item?id=${id}`;

export default function Story({story}: StoryProps) {
  return <Item>
    <ArticleLink href={story.url || createHackerNewsUrl(story.id)}>
      <div>
        {story.title}
        <Info>
          <span>by {story.by}</span>
          <span><Time time={story.time} expandFullyOnHover={true} /></span>
        </Info>
      </div>
    </ArticleLink>
  </Item>;
}