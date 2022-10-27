import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar';
import News from './pages/News';
import NewsBlock from './pages/NewsBlock';
import React from 'react';
import { getLastNews } from './api';
import { useAppDispatch } from './hooks';
import { setNewsItems } from './redux/newsSlice';
import Head from './components/Head';
import { Flex, Heading } from '@chakra-ui/react';

const PageWrapper: React.FC = (props) => {
    return (
        <Flex direction="column" maxW={{ xl: '1400px' }} m="0 auto">
            {props.children}
        </Flex>
    );
};

function App() {
    const dispatch = useAppDispatch();
    const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsLoaded(false);
        getLastNews().then((data) => {
            dispatch(setNewsItems(data));
            setIsLoaded(true);
        });
        console.log('Initialized');
    }, []);

    return (
        <Router>
            <Head title="Hacker News" />
            <PageWrapper>
                <Navbar />
                <Switch>
                    <Redirect exact from="/" to="/news" />
                    <Route path="/news" exact>
                        <News isLoaded={isLoaded} />
                    </Route>
                    <Route path="/news/:id">
                        <NewsBlock />
                    </Route>
                    <Route path="*" component={() => <Heading textAlign="center">404 Not Found</Heading>} />
                </Switch>
            </PageWrapper>
        </Router>
    );
}

export default App;
