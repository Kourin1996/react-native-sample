import React from 'react';
import NewsSourcesContext from './hooks/news-sources-context';
import NewsItemsContext from './hooks/news-items-context';
import Navigation from './navigations';

const newsItem = {
  id: '0',
  sourceId: '02',
  title:
    'WanWan Nyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  summary:
    'Nyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahoge',
  body: 'Nyan....',
  date: new Date(),
  imageUrls: [
    'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg',
  ],
};

const newsItems = new Array(10).fill(null).map((_, i) => ({
  ...newsItem,
  id: i.toString(),
}));

const newsSource = {
  id: 0,
  name: 'Hello, World',
  url: 'hogehoge',
  logoUrl:
    'https://static.toiimg.com/thumb/msid-67586673,width-800,height-600,resizemode-75,imgsize-3918697,pt-32,y_pad-40/67586673.jpg',
};

const newsSources = new Array(10).fill(null).map((_, i) => ({
  ...newsSource,
  id: i.toString(),
}));

const App = () => {
  return (
    <NewsSourcesContext.Provider value={newsSources}>
      <NewsItemsContext.Provider value={newsItems}>
        <Navigation />
      </NewsItemsContext.Provider>
    </NewsSourcesContext.Provider>
  );
};

export default App;
