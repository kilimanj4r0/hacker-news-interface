import { Box, Flex, Heading, Stack } from '@chakra-ui/react';

import { useAppSelector } from '../hooks';
import BookInfo from '../components/BookInfo';

const BookList = () => {
    // If we had any other state like book, we could have select it same way we select book. For example, author would be  useAppSelector((state) => state.author.authorNames)
    const bookList = useAppSelector((state) => state.book.bookList);

    return (
        <Flex height="100vh" justifyContent="center" alignItems="center" flexDirection="column">
            <Box width="50%">
                <Heading color="white">Latest news</Heading>
                <Box rounded="md" bg="purple.500" color="white" px="15px" py="15px">
                    <Stack spacing={8}>
                        {bookList.map((book) => (
                            <BookInfo key={book.id} title={book.title} author={book.author} id={book.id} />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Flex>
    );
};

export default BookList;
