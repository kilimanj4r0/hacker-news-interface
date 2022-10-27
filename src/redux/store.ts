import { configureStore } from '@reduxjs/toolkit';
import { newsSlice } from './newsSlice';
import { commentsSlice } from './commentsSlice';

export const store = configureStore({
    reducer: {
        news: newsSlice.reducer,
        comments: commentsSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
