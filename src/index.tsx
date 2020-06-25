import React from 'react';
import Realm from 'realm';
import { NewsSource, NewsItem } from './domains';
import { NewsSourceSchema, NewsItemSchema } from './schemas';
import { NewsSourceRepository, NewsItemRepository } from './repositories';
import AppContext from './hooks/app-context';
import Navigation from './navigations';
import { fetchRssSourceInfo, fetchRssItems } from './utils/rss';

const defaultSourceUrls = [
  'https://cointelegraph.com/rss',
  'https://www.blockchain-council.org/feed/',
];

const initializeSource = async (
  newsSourceRepo: NewsSourceRepository,
  newsItemRepo: NewsItemRepository,
) => {
  for (const url of defaultSourceUrls) {
    const [source, items] = await fetchRssSourceInfo(url);
    const { id } = await newsSourceRepo.putSource(source);
    const itemsWithSourceId = items
      .sort((a, b) => a.published.getTime() - b.published.getTime())
      .map((item) => ({
        ...item,
        sourceId: id,
        imageUrl: item.imageUrl ?? source.logoUrl ?? '',
      }));
    await newsItemRepo.putItems(itemsWithSourceId);
  }
};

const App: React.FC<void> = () => {
  const [initialized, setInitialized] = React.useState(false);

  const [
    newsSourceRepo,
    setNewsSourceRepo,
  ] = React.useState<NewsSourceRepository | null>(null);
  const [
    newsItemRepo,
    setNewsItemRepo,
  ] = React.useState<NewsItemRepository | null>(null);

  React.useEffect(() => {
    let realm: Realm | null = null;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Realm.open({
      schema: [NewsSourceSchema, NewsItemSchema],
    }).then(async (obj) => {
      realm = obj;

      const newsSourceRepo = new NewsSourceRepository(
        realm,
        NewsSourceSchema.schema.name,
      );
      const newsItemRepo = new NewsItemRepository(
        realm,
        NewsItemSchema.schema.name,
      );
      setNewsSourceRepo(newsSourceRepo);
      setNewsItemRepo(newsItemRepo);

      if (newsSourceRepo.getNumberOfSources() === 0) {
        await initializeSource(newsSourceRepo, newsItemRepo);
      }

      setInitialized(true);
    });

    () => {
      if (realm !== null) {
        realm.close();
      }
    };
  }, []);

  const addSource = React.useCallback(
    async (name: string, url: string) => {
      if (newsSourceRepo === null || newsItemRepo === null) {
        throw new Error('DB is not ready');
      }

      const existingSources = newsSourceRepo.findByRssUrl(url);
      if (existingSources?.length !== 0) {
        throw new Error('Already Exists');
      }
      console.log('existingSources', existingSources);
      try {
        const [source, items] = await fetchRssSourceInfo(url);
        if (name.length > 0) {
          source.name = name;
        }
        console.log('fetchRssSourceInfo', source);
        const { id } = await newsSourceRepo.putSource(source);
        const itemsWithSourceId = items.map((item) => ({
          ...item,
          sourceId: id,
          imageUrl: item.imageUrl ?? source.logoUrl ?? '',
        }));
        await newsItemRepo.putItems(itemsWithSourceId);

        return source;
      } catch (error) {
        console.error(error);
        throw new Error('Internal server error');
      }
    },
    [newsSourceRepo, newsItemRepo],
  );

  const loadSources = React.useCallback(() => {
    if (newsSourceRepo !== null) {
      return newsSourceRepo.getAll();
    }
  }, [newsSourceRepo]);

  const loadItems = React.useCallback(
    (source?: NewsSource, limit = 20, offset = 0) => {
      if (newsItemRepo !== null) {
        if (source?.id !== undefined) {
          return newsItemRepo.getItemsBySourceIndex(source.id, limit, offset);
        } else {
          return newsItemRepo.getItems(limit, offset);
        }
      }
    },
    [newsItemRepo],
  );

  const updateItems = React.useCallback(async () => {
    if (newsSourceRepo && newsItemRepo) {
      const sources = newsSourceRepo.getAll();
      for (const source of sources) {
        const latestItem = newsItemRepo.getLatestItem(source.id);
        const items = (await fetchRssItems(source.rssUrl))
          .filter(
            (item: NewsItem) =>
              latestItem === undefined || item.published > latestItem.published,
          )
          .sort((a, b) => a.published.getTime() - b.published.getTime())
          .map((item) => ({ ...item, sourceId: source.id }));
        await newsItemRepo.putItems(items);
      }
    }
  }, [newsSourceRepo, newsItemRepo]);

  const appContextValue = React.useMemo(() => {
    return {
      initialized,
      addSource,
      loadSources,
      loadItems,
      updateItems,
    };
  }, [initialized, addSource, loadSources, loadItems, updateItems]);

  return (
    <AppContext.Provider value={appContextValue}>
      <Navigation />
    </AppContext.Provider>
  );
};

export default App;
