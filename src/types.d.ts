export type NewsItemInfo = {
    id: number;
    url: string | undefined;
    title: string | undefined;
    rating: number | undefined;
    time: number | undefined;
    author: string | undefined;
    commentsCount: number | undefined;
    comments: number[] | undefined;
    type: string | undefined;
};

export type Comment = {
    id: number;
    author: string | undefined;
    time: number | undefined;
    text: string | undefined;
};
