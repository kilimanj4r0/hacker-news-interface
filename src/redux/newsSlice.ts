import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { NewsItemInfo } from '../types';

type initialStateType = {
    newsItems: NewsItemInfo[];
    newsItem: NewsItemInfo;
    latestNewsId: number;
};

const initialState: initialStateType = {
    newsItems: [],
    newsItem: {} as NewsItemInfo,
    latestNewsId: -1,
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNewsItems: (state, action: PayloadAction<NewsItemInfo[]>) => {
            state.newsItems = action.payload;
            state.latestNewsId = state.newsItems[0].id;
        },
        updateNewsItems: (state, action: PayloadAction<NewsItemInfo[]>) => {
            const newNewsItems: NewsItemInfo[] = action.payload;

            state.newsItems.unshift(...newNewsItems);
            state.newsItems = state.newsItems.slice(0, -newNewsItems.length);
            state.latestNewsId = state.newsItems[0].id;
        },
        setNewsItem: (state, action: PayloadAction<NewsItemInfo>) => {
            state.newsItem = action.payload;
        },
    },
});

export const { setNewsItems, updateNewsItems, setNewsItem } = newsSlice.actions;

export const selectNewsItemsState = (state: RootState) => {
    return {
        newsItems: state.news.newsItems,
        latestNewsId: state.news.latestNewsId,
    };
};

export const selectNewsItem = (state: RootState) => state.news.newsItem;

export default newsSlice.reducer;
