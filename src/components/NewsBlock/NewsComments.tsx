import React from 'react';
import { Box, Button, Heading, Skeleton, SkeletonText, useMediaQuery, VStack } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { getComments, getNewsItem } from '../../api';
import CommentRow from './CommentRow';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearComments, selectComments, setUpdateComments } from '../../redux/commentsSlice';
import { selectNewsItem } from '../../redux/newsSlice';

const NewsComments: React.FC<{ areNewsLoaded: boolean }> = ({ areNewsLoaded }) => {
    const { comments, commentsCount } = useAppSelector(selectComments);
    const newsItem = useAppSelector(selectNewsItem);
    const dispatch = useAppDispatch();
    const isDesktop = useMediaQuery('(min-width: 640px)')[0];
    const [areCommentsLoaded, setAreCommentsLoaded] = React.useState<boolean>(false);

    const getCommentsHandler = (commentsIds?: number[]) => {
        if (commentsIds === undefined) {
            setAreCommentsLoaded(true);
            return;
        }
        setAreCommentsLoaded(false);
        getComments(commentsIds).then((data) => {
            dispatch(setUpdateComments(data));
            setAreCommentsLoaded(true);
        });
    };

    const updateCommentsHandler = () => {
        if (commentsCount > 0) {
            getNewsItem(newsItem.id).then((news) => {
                if (news.commentsCount !== commentsCount) {
                    getCommentsHandler(news.comments);
                }
            });
        }
    };

    React.useEffect(() => {
        dispatch(clearComments());
        getCommentsHandler(newsItem.comments);
    }, [newsItem]);

    return (
        <>
            <Skeleton isLoaded={areCommentsLoaded && areNewsLoaded} height="50px">
                <Box display="flex" justifyContent="space-between" alignItems="stretch">
                    <Heading fontSize={['lg', 'xl']} mr={2}>
                        {commentsCount > 0 ? `Comments (${commentsCount})` : 'No comments yet'}
                    </Heading>
                    <Button
                        color="orange"
                        variant="outline"
                        fontWeight="medium"
                        fontSize="md"
                        display="flex"
                        flex="0 0 auto"
                        alignItems="center"
                        height="auto"
                        py={2}
                        onClick={() => updateCommentsHandler()}
                    >
                        <RepeatIcon mr={1} color="orange" />
                        {isDesktop && 'Update'}
                    </Button>
                </Box>
            </Skeleton>
            {(!areCommentsLoaded || !areNewsLoaded) && (
                <VStack spacing={5} padding={3} align="stretch">
                    {[...Array(10)].map((_, index) => (
                        <SkeletonText key={index} noOfLines={3} />
                    ))}
                </VStack>
            )}
            {areCommentsLoaded && areNewsLoaded && (
                <VStack spacing={3} py={3} align="stretch">
                    {comments.map((comment) => {
                        if (comment !== undefined && comment.text !== '') {
                            return <CommentRow key={comment.id} comment={comment} />;
                        }
                    })}
                </VStack>
            )}
        </>
    );
};

export default NewsComments;
