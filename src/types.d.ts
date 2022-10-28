export type NewsItemInfo = {
    id: number;
    url: string;
    title: string;
    rating: number;
    time: number;
    author: string;
    commentsCount: number;
    comments?: number[];
    type: string;
};

export type Comment = {
    id: number;
    author: string;
    time: number;
    text: string;
    parent?: number;
    kidsIds?: number[];
    // kids?: CommentMap;
    kids?: Comment[];
};

export type CommentMap = {
    [id: number]: Comment[] | undefined;
};
