import React from 'react';
import { NewsSource } from 'domains';

export interface OperationContextValue {
  addSource: (name: string, url: string) => Promise<NewsSource>;
}

const OperationContext = React.createContext<OperationContextValue | null>(
  null,
);

export default OperationContext;
