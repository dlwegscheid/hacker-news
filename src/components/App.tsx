import React from 'react';
import StoryList from './StoryList';
import Header from './Header';
import {StoriesProvider} from '../contexts/StoriesProvider';

function App() {
  return <>
    <Header />
    <StoriesProvider>
      <StoryList />
    </StoriesProvider>
  </>;
}

export default App;
