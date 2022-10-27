export type NewsItemInfo = {
    id: number;
    url: string | undefined;
    title: string | undefined;
    rating: number | undefined;
    date: string | undefined;
    author: string | undefined;
    commentsCount: number | undefined;
    comments: number[] | undefined;
    type: string | undefined;
};

export type Comment = {
    id: number;
    author: string | undefined;
    date: string | undefined;
    text: string | undefined;
};

export type BookState = {
    id: string;
    title: string | undefined;
    author: string | undefined;
};
