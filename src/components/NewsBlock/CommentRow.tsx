import React from 'react';

import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { AtSignIcon, ChevronDownIcon, ChevronUpIcon, TimeIcon } from '@chakra-ui/icons';
import { Comment } from '../../types';
import { convertTimeToDate } from '../../utils';
import parse from 'html-react-parser';
import { getComments } from '../../api';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearCommentKids, selectCommentKids, selectCommentKidsIds, setCommentKids } from '../../redux/commentsSlice';

const CommentRow: React.FC<{ comment: Comment; ml?: number }> = ({ comment, ml }) => {
    const commentKids = useAppSelector(selectCommentKids(comment.id));
    const commentKidsIds = useAppSelector(selectCommentKidsIds(comment.id));
    const dispatch = useAppDispatch();

    const [kidsOpened, setKidsOpened] = React.useState<boolean>(false);
    const [disableKids, setDisableKids] = React.useState<boolean>(false);

    const getCommentKidsHandler = () => {
        if (commentKidsIds === undefined) {
            setDisableKids(true);
            return;
        }
        getComments(commentKidsIds).then((data) => {
            dispatch(
                setCommentKids({
                    comment: comment,
                    kids: data,
                }),
            );
        });
    };
    console.log('commentKidsIds', commentKidsIds, 'commentKids', commentKids);

    return (
        <Box ml={ml}>
            <Box
                w="100%"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                px={4}
                py={2}
                display="flex"
                justifyContent="space-between"
                alignItems="stretch"
            >
                <Flex w="100%" direction="column" justifyContent="flex-start">
                    <Box display="flex" alignItems="center">
                        <Box
                            fontWeight="medium"
                            fontSize="xs"
                            display="flex"
                            alignItems="center"
                            mr={3}
                            color="orange.500"
                        >
                            <AtSignIcon mr={1} />
                            {comment.author}
                        </Box>
                        <Box color="gray.500" fontWeight="medium" fontSize="xs" display="flex" alignItems="center">
                            <TimeIcon mr={1} />
                            {convertTimeToDate(comment.time)}
                        </Box>
                    </Box>
                    <Box fontWeight="medium" fontSize={['sm', 'md']} textAlign="left">
                        {parse(comment.text)}
                    </Box>
                </Flex>
                <Button
                    color="orange.500"
                    variant="outline"
                    fontWeight="medium"
                    fontSize="md"
                    _hover={{ bg: 'gray.50' }}
                    ml={3}
                    height="auto"
                    display={disableKids ? 'none' : 'flex'}
                    onClick={() => {
                        if (!kidsOpened) {
                            console.log('Get kids');
                            getCommentKidsHandler();
                        } else {
                            console.log('Clear kids');
                            dispatch(clearCommentKids(comment.id));
                        }
                        setKidsOpened(!kidsOpened);
                    }}
                >
                    {kidsOpened ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
            </Box>
            {/* TODO Add Skeleton */}
            {kidsOpened && commentKids !== undefined && (
                <VStack spacing={3} py={3} align="stretch">
                    {commentKids.map((commentKid) => {
                        console.log('comment', commentKid);
                        if (commentKid !== undefined && commentKid.text !== '') {
                            return <CommentRow key={commentKid.id} comment={commentKid} ml={4} />;
                        }
                    })}
                </VStack>
            )}
        </Box>
    );
};

export default CommentRow;
