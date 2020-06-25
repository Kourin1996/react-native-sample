import React from 'react';
import { NewsSource, NewsItem } from 'domains';

export interface AppContextValue {
  initialized: boolean;
  addSource: (name: string, url: string) => Promise<NewsSource>;
  loadSources: () => NewsSource[] | undefined;
  loadItems: (
    source?: NewsSource,
    limit?: number,
    offset?: number,
  ) => NewsItem[] | undefined;
  updateItems: () => Promise<void>;
}

const AppContext = React.createContext<AppContextValue | null>(null);

export default AppContext;
