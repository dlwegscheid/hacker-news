import React, {Suspense} from 'react';
import {FirebaseAppProvider} from 'reactfire';
import ArticleList from './ArticleList';
import {StoriesProvider} from './StoriesProvider';

function App() {
  const firebaseConfig = {
    databaseURL: "https://hacker-news.firebaseio.com"
  };

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback="loading...">
        <StoriesProvider>
          <ArticleList></ArticleList>
        </StoriesProvider>
      </Suspense>
    </FirebaseAppProvider>
  );
}

export default App;
