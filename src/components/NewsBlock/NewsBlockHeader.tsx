import React from 'react';
import { Badge, Box, Button, Heading, Skeleton, SkeletonText, useMediaQuery } from '@chakra-ui/react';
import { AtSignIcon, ExternalLinkIcon, TimeIcon } from '@chakra-ui/icons';
import { convertTimeToDate } from '../../utils';
import { useAppSelector } from '../../hooks';
import { selectNewsItem } from '../../redux/newsSlice';

const NewsBlock: React.FC<{ areNewsLoaded: boolean }> = ({ areNewsLoaded }) => {
    const newsItem = useAppSelector(selectNewsItem);
    const isDesktop = useMediaQuery('(min-width: 640px)')[0];

    return (
        <>
            {!areNewsLoaded && <SkeletonText noOfLines={4} />}
            {areNewsLoaded && (
                <>
                    <Box display="flex" justifyContent="space-between" alignItems="stretch">
                        <Heading fontSize={['xl', '2xl', '3xl']} mr={2} display="flex">
                            {newsItem.title}
                        </Heading>
                        <Button
                            as="a"
                            color="orange"
                            variant="outline"
                            fontWeight="medium"
                            fontSize="md"
                            display="flex"
                            flex="0 0 auto"
                            alignItems="center"
                            height="auto"
                            href={newsItem.url}
                        >
                            <ExternalLinkIcon mr={1} color="orange" />
                            {isDesktop && 'Go to source'}
                        </Button>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box
                            fontWeight="medium"
                            fontSize={['xs', 'md']}
                            display="flex"
                            alignItems="center"
                            mr={3}
                            color="orange.500"
                        >
                            <AtSignIcon mr={1} /> {newsItem.author}
                        </Box>
                        <Box
                            color="gray.500"
                            fontWeight="medium"
                            fontSize={['xs', 'md']}
                            display="flex"
                            alignItems="center"
                        >
                            <TimeIcon mr={1} />
                            {convertTimeToDate(newsItem.time)}
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};

export default NewsBlock;
