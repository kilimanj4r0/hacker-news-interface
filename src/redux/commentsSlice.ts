import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Comment } from '../types';

type initialStateType = {
    comments: Comment[];
    commentsCount: number;
};

const initialState: initialStateType = {
    comments: [] as Comment[],
    commentsCount: 0,
};

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setUpdateComments: (state, action: PayloadAction<Comment[]>) => {
            state.comments = action.payload;
            state.commentsCount = action.payload.length;
        },
        setCommentKids: (state, action: PayloadAction<{ kids: Comment[]; id: number }>) => {
            console.log('payload', action.payload);
            const { kids, id } = action.payload;
            const commentIndex = state.comments.findIndex((comment) => comment.id === id);
            state.comments[commentIndex].kids = kids;
        },
        clearCommentKids: (state, action: PayloadAction<number>) => {
            const commentIndex = state.comments.findIndex((comment) => comment.id === action.payload);
            state.comments[commentIndex].kids = undefined;
        },
    },
});

export const { setUpdateComments, setCommentKids, clearCommentKids } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;
export const selectCommentKids = (id: number) => {
    return (state: RootState): Comment[] | undefined =>
        state.comments.comments.filter((comment) => comment.id === id)[0].kids;
};

export default commentsSlice.reducer;
