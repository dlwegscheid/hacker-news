import React from 'react';
import ArticleList from './ArticleList';
import Header from './Header';
import {StoriesProvider} from '../contexts/StoriesProvider';

function App() {

  return <>
    <Header />
    <StoriesProvider>
      <ArticleList />
    </StoriesProvider>
  </>;
}

export default App;
