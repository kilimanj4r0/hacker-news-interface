import React from 'react';

import { Box, Flex, Heading, Stack } from '@chakra-ui/react';
import { updateNews } from '../api';
import { NewsContext } from '../context';
import NewsRow from '../components/News/NewsRow';

const News: React.FC = () => {
    const { news, setNews } = React.useContext(NewsContext);

    React.useEffect(() => {
        const intervalCall = setInterval(() => {
            console.log('intervalCall:', news);
            updateNews(news).then((data) => setNews(data));
        }, 1000 * 6);
        return () => {
            clearInterval(intervalCall);
        };
    }, [news]);

    return (
        <Flex height="100vh" justifyContent="center" alignItems="center" flexDirection="column">
            <Box width="75%">
                <Heading color="white">Latest news</Heading>
                <Box rounded="md" bg="purple.500" color="white" px="15px" py="15px">
                    <Stack spacing={3}>
                        {news.map((row) => (
                            <NewsRow key={row.id} row={row} />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Flex>
    );
};

export default News;
