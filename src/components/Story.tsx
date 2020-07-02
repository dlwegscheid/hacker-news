import React from 'react';
import {StoryModel} from '../types/story';

type StoryProps = {
  story: StoryModel;
}

export default function Story({story}: StoryProps) {
  return <li key={story.id}><a href={story.url}>{story.title}</a></li>;
}