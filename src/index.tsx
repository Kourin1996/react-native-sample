import React from 'react';
import { NewsSource, NewsItem } from './domains';
import NewsSourcesContext from './hooks/news-sources-context';
import NewsItemsContext from './hooks/news-items-context';
import Navigation from './navigations';
import { fetchRssSourceInfo } from './utils/rss';

const App = () => {
  const [sources, setSources] = React.useState<NewsSource[]>([]);
  const [items, setItems] = React.useState<NewsItem[]>([]);

  React.useEffect(async () => {
    const [source, items] = await fetchRssSourceInfo(
      'https://cointelegraph.com/rss',
    );
    source.id = '0';
    const itemsWithId = items.map((item, index) => ({
      ...item,
      id: index.toString(),
      sourceId: '0',
    }));
    setSources([source]);
    setItems(itemsWithId);
    return () => {};
  }, []);

  console.log('sources', sources);
  console.log('items', items);

  return (
    <NewsSourcesContext.Provider value={sources}>
      <NewsItemsContext.Provider value={items}>
        <Navigation />
      </NewsItemsContext.Provider>
    </NewsSourcesContext.Provider>
  );
};

export default App;
