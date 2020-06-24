import React from 'react';
import Realm from 'realm';
import { NewsSource } from './domains';
import { NewsSourceSchema, NewsItemSchema } from './schemas';
import { NewsSourceRepository, NewsItemRepository } from './repositories';
import AppContext from './hooks/app-context';
import Navigation from './navigations';
import { fetchRssSourceInfo } from './utils/rss';

const defaultSourceUrls = [
  'https://cointelegraph.com/rss',
  'https://www.blockchain-council.org/feed/',
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const initializeSource = async (
  newsSourceRepo: NewsSourceRepository,
  newsItemRepo: NewsItemRepository,
) => {
  console.log('initializeSource', newsSourceRepo, newsItemRepo);
  for (const url of defaultSourceUrls) {
    const [source, items] = await fetchRssSourceInfo(url);
    const { id } = await newsSourceRepo.putSource(source);
    const itemsWithSourceId = items.map((item) => ({
      ...item,
      sourceId: id,
      imageUrl: item.imageUrl ?? source.logoUrl ?? '',
    }));
    console.log('initialize...', source.rssUrl, itemsWithSourceId.length);
    const itemRecords = await newsItemRepo.putItems(itemsWithSourceId);
    console.log('itemRecords', itemRecords);
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

  React.useEffect(async () => {
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
      try {
        const [source, items] = await fetchRssSourceInfo(url);
        if (name.length > 0) {
          source.name = name;
        }
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

  const appContextValue = React.useMemo(() => {
    return {
      initialized,
      addSource,
      loadSources,
      loadItems,
    };
  }, [initialized, addSource, loadSources, loadItems]);

  return (
    <AppContext.Provider value={appContextValue}>
      <Navigation />
    </AppContext.Provider>
  );
};

export default App;
