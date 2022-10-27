import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { NewsItemInfo } from '../types';

type initialStateType = {
    newsItems: NewsItemInfo[];
    latestNewsId: number;
};

const initialState: initialStateType = {
    newsItems: [],
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
    },
});

export const { setNewsItems, updateNewsItems } = newsSlice.actions;

export const selectNewsItems = (state: RootState) => state.news;

export default newsSlice.reducer;
