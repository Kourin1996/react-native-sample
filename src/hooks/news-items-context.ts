import React from 'react';
import { NewsItem } from 'domains';

const NewsItemsContext = React.createContext<NewsItem[]>([]);

export default NewsItemsContext;
