import React from 'react';
import { NewsSource } from 'domains';

export interface OperationContextValue {
  addSource: (name: string, url: string) => Promise<NewsSource>;
  loadItemsBySource: (source?: NewsSource) => Promise<void>;
  resetItems: () => void;
}

const OperationContext = React.createContext<OperationContextValue | null>(
  null,
);

export default OperationContext;
