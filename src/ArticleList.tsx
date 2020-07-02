import React, {useContext} from 'react';
import {StoriesContext} from './StoriesProvider';

export default function ArticleList() {
  const {stories} = useContext(StoriesContext);

  return <ol>
    {stories.stories.map(s => <li key={s.id}>{s.id} - {s.title}</li>)}
  </ol>;
}