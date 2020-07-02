import React, {Suspense} from 'react';
import {FirebaseAppProvider} from 'reactfire';
import ArticleList from './ArticleList';

function App() {
  const firebaseConfig = {
    databaseURL: "https://hacker-news.firebaseio.com"
  };

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Suspense fallback="loading...">
        <ArticleList></ArticleList>
      </Suspense>
    </FirebaseAppProvider>
  );
}

export default App;
