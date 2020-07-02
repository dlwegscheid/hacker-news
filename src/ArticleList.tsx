import React from 'react';
import {useDatabase, useDatabaseListData} from 'reactfire';

export default function ArticleList() {
  const storyListRef = useDatabase().ref('v0/newstories');

  const storyIds = useDatabaseListData(storyListRef) as number[];

  return <ol>
    {storyIds.map(s => <li key={s}>{s}</li>)}
  </ol>;
}