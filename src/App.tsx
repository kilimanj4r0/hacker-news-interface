import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import BookInfo from './components/BookInfo';
import News from './pages/News';
import { NewsContext } from './context';
import React from 'react';
import { getLastNews, getNewStories } from './api';
import { NewsItemInfo } from './types';

function App() {
    const [news, setNews] = React.useState<NewsItemInfo[]>([]);
    const [stories, setStories] = React.useState<number[]>([]);

    React.useEffect(() => {
        getNewStories().then((data) => setStories(data));
        getLastNews(2).then((data) => {
            setNews(data);
        });
    }, []);
    console.log('stories:', stories);
    return (
        <NewsContext.Provider value={{ news, setNews }}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/news" exact component={News} />
                    <Route path="/news-item/:id" component={BookInfo} /> {/* NewsItem */}
                    <Route path="*" component={() => <h1 color="white">404 Not Found</h1>} />
                </Switch>
            </Router>
        </NewsContext.Provider>
    );
}

export default App;
