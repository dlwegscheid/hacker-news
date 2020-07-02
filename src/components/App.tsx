import React from 'react';
import ArticleList from './ArticleList';
import {StoriesProvider} from '../contexts/StoriesProvider';

function App() {

  return (
    <StoriesProvider>
      <ArticleList></ArticleList>
    </StoriesProvider>
  );
}

export default App;
