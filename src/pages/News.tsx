import React from 'react';

import { Button, SkeletonText, VStack } from '@chakra-ui/react';
import NewsRow from '../components/News/NewsRow';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectNewsItemsState, updateNewsItems } from '../redux/newsSlice';
import { getLastNewsIds, getNews } from '../api';
import { colors } from '../design/colors';
import { RepeatIcon } from '@chakra-ui/icons';

const News: React.FC<{ isLoaded: boolean }> = ({ isLoaded }) => {
    const { newsItems, latestNewsId } = useAppSelector(selectNewsItemsState);
    const dispatch = useAppDispatch();

    const updateNews = () => {
        getLastNewsIds().then((data) => {
            const currentLatestNewsId = data.indexOf(latestNewsId);
            if (currentLatestNewsId !== 0) {
                const ids = data.slice(0, currentLatestNewsId);
                getNews(ids).then((data) => dispatch(updateNewsItems(data)));
                console.log('Added news', ids);
            }
            console.log('Not updated');
        });
    };

    React.useEffect(() => {
        const intervalCall = setInterval(() => {
            updateNews();
        }, 1000 * 60); // One minute
        return () => {
            clearInterval(intervalCall);
        };
    }, [newsItems, latestNewsId]);
    // TODO Maybe add pagination
    return (
        <>
            <Button
                fontSize="md"
                variant="outline"
                _hover={{ bg: 'gray.50' }}
                mx={3}
                my={1}
                w="fit-content"
                color={colors.primary}
                onClick={() => updateNews()}
                display="flex"
            >
                <RepeatIcon mr={1} />
                Update
            </Button>
            {!isLoaded && (
                <VStack spacing={5} padding={3} align="stretch">
                    {[...Array(10)].map((_, index) => (
                        <SkeletonText key={index} noOfLines={5} />
                    ))}
                </VStack>
            )}
            {isLoaded && (
                <VStack spacing={3} padding={3} align="stretch">
                    {newsItems.map((row, index) => (
                        <NewsRow key={row.id} row={row} index={index} />
                    ))}
                </VStack>
            )}
        </>
    );
};

export default News;
