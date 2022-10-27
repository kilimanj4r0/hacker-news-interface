import { Comment, NewsItemInfo } from './types';

export const API_URL: string = 'https://hacker-news.firebaseio.com/v0';
export const API_URL_POSTFIX: string = '.json?print=pretty';
export const NEWS_NUMBER: number = 100;

export const getNewsItem = async (id: number): Promise<NewsItemInfo> => {
    const response = await fetch(`${API_URL}/item/${id}${API_URL_POSTFIX}`);
    const data = await response.json();
    if (data === null) {
        return {} as NewsItemInfo;
    }
    return {
        id: data.id,
        url: data.url,
        title: data.title,
        rating: data.score,
        date: data.time,
        author: data.by,
        commentsCount: data.descendants,
        comments: data.kids,
        type: data.type,
    };
};

export const getNewStories = async (): Promise<number[]> => {
    const response = await fetch(`${API_URL}/newstories${API_URL_POSTFIX}`);
    return await response.json();
};

export const getNewsMaxItem = async (): Promise<number> => {
    const response = await fetch(`${API_URL}/maxitem${API_URL_POSTFIX}`);
    return await response.json();
};

export const getNewsItemComments = async (id: number): Promise<Comment> => {
    const response = await fetch(`${API_URL}/item/${id}${API_URL_POSTFIX}`);
    const data = await response.json();
    return {
        id: data.id,
        author: data.by,
        date: data.time,
        text: data.text,
    };
};

export const getLastNews = async (count = NEWS_NUMBER): Promise<NewsItemInfo[]> => {
    const news: NewsItemInfo[] = [];
    let maxItemId = await getNewsMaxItem().then((maxItemId) => maxItemId);
    while (news.length !== count) {
        await getNewsItem(maxItemId).then((currentNewsRow) => {
            if (currentNewsRow && currentNewsRow.title !== undefined && currentNewsRow.type === 'story') {
                news.push(currentNewsRow);
            }
        });
        maxItemId -= 1;
    }
    return news;
};

export const updateNews = async (news: NewsItemInfo[]): Promise<NewsItemInfo[]> => {
    // TODO: Maybe consider saving last MaxItemId
    if (news.length === 0) {
        return await getLastNews();
    }
    const currentLatestNewsId = news[0].id;
    let maxItemId = await getNewsMaxItem().then((maxItemId) => maxItemId);
    const latestNews: NewsItemInfo[] = [];

    while (currentLatestNewsId !== maxItemId) {
        await getNewsItem(maxItemId).then((currentNewsRow) => {
            if (currentNewsRow && currentNewsRow.title !== undefined && currentNewsRow.type === 'story') {
                latestNews.push(currentNewsRow);
            }
        });
        maxItemId -= 1;
    }
    news.unshift(...latestNews); // Add the latest news to the beginning of the array
    if (latestNews.length > 0) {
        news = news.slice(0, -latestNews.length); // Return latest news removing old news
    }
    return news;
};
