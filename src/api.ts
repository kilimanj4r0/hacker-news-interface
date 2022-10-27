import { Comment, NewsItemInfo } from './types';

export const API_URL: string = 'https://hacker-news.firebaseio.com/v0';
export const API_URL_POSTFIX: string = '.json?print=pretty';
export const NEWS_NUMBER: number = 15;
// TODO: Handlge changes in news, some news may accidentally disappear or being deleted (While updating news it may become null)
export const getNewsItem = async (id: number | string): Promise<NewsItemInfo> => {
    const response = await fetch(`${API_URL}/item/${id}${API_URL_POSTFIX}`);
    const data = await response.json();
    if (data === null || data.title === undefined) {
        console.log(data.title, data);
        // TODO: Check if there is undefined in data
        return {} as NewsItemInfo;
    }
    return {
        id: data.id,
        url: data.url,
        title: data.title,
        rating: data.score,
        time: data.time,
        author: data.by,
        commentsCount: data.descendants,
        comments: data.kids,
        type: data.type,
    };
};

export const getLastNewsIds = async (count = NEWS_NUMBER): Promise<number[]> => {
    const response = await fetch(`${API_URL}/newstories${API_URL_POSTFIX}`);
    const data = await response.json();
    return data.slice(0, Math.min(count, data.length));
};

export const getLastNews = async (count = NEWS_NUMBER): Promise<NewsItemInfo[]> => {
    const ids = await getLastNewsIds(count).then((ids) => ids);
    return Promise.all(ids.map((id) => getNewsItem(id))); // TODO Maybe use Promise.race
};

export const getNews = async (ids: number[]): Promise<NewsItemInfo[]> => {
    return Promise.all(ids.map((id) => getNewsItem(id)));
};

export const getComment = async (id: number | string): Promise<Comment> => {
    const response = await fetch(`${API_URL}/item/${id}${API_URL_POSTFIX}`);
    const data = await response.json();
    return {
        id: data.id,
        author: data.by,
        time: data.time,
        text: data.text,
        kidsIds: data.kids,
        parent: data.parent,
        kids: undefined,
    };
};

export const getComments = async (ids: number[]): Promise<Comment[]> => {
    return Promise.all(ids.map((id) => getComment(id)));
};
