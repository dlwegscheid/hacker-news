import React, {useContext} from 'react';
import {StoriesContext} from '../contexts/StoriesProvider';

export default function ArticleList() {
  const {stories} = useContext(StoriesContext);

  return <ol>
    {stories.details.map(s => <li key={s.id}>{s.id} - {s.title} - {s.url}</li>)}
  </ol>;
}