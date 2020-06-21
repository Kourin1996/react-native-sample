import React from 'react';
import { NewsSource } from 'domains';

const NewsSourcesContext = React.createContext<NewsSource[]>([]);

export default NewsSourcesContext;
