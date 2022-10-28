import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Comment, CommentMap } from '../types';
import { getComment } from '../api';

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
        setCommentKids: (state, action: PayloadAction<{ comment: Comment; kids: Comment[] }>) => {
            const { comment, kids } = action.payload;

            const recursiveUpdate = (parent: Comment, comments: Comment[]): Comment => {
                if (parent.parent === undefined) {
                    console.log('parent.parent === undefined', parent, comments);
                    return { ...parent, kids: comments };
                }
                getComment(parent.parent).then((newParent) => {
                    const newComment = { ...parent, kids: comments } as Comment;
                    console.log('newComment', newComment);
                    console.log('newParent', newParent);
                    if (newParent.kids !== undefined) {
                        return recursiveUpdate(newParent, [...newParent.kids, newComment]);
                    }
                });
                return { ...parent, kids: comments };
            };

            const commentToInsert = recursiveUpdate(comment, kids);
            const index = state.comments.findIndex((item) => item.id === commentToInsert.id);
            state.comments[index] = commentToInsert;
        },
        clearCommentKids: (state, action: PayloadAction<number>) => {
            const commentIndex = state.comments.findIndex((comment) => comment.id === action.payload);
            state.comments[commentIndex].kids = undefined;
        },
        clearComments: (state) => {
            state.comments = [];
            state.commentsCount = 0;
        },
    },
});

export const { setUpdateComments, setCommentKids, clearCommentKids, clearComments } = commentsSlice.actions;

export const selectComments = (state: RootState) => state.comments;
export const selectCommentKids = (id: number) => {
    return (state: RootState) => {
        const comment = state.comments.comments.filter((comment) => comment.id === id)[0];
        if (comment === undefined) {
            return undefined;
        }
        return comment.kids;
    };
};

export const selectCommentKidsIds = (id: number) => {
    return (state: RootState) => {
        const comment = state.comments.comments.filter((comment) => comment.id === id)[0];
        if (comment === undefined) {
            return undefined;
        }
        return comment.kidsIds;
    };
};
// () => { kidsIds: number[]; kids: Comment[] } | undefined
export default commentsSlice.reducer;
