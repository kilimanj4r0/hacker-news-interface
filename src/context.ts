import React from 'react';
import { NewsItemInfo } from './types';

export const NewsContext = React.createContext<{
    news: NewsItemInfo[];
    setNews: React.Dispatch<React.SetStateAction<NewsItemInfo[]>>;
}>({
    news: [],
    setNews: () => {},
});
