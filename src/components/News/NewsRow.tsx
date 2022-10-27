import React from 'react';

import { Badge, Box } from '@chakra-ui/react';
import { NewsItemInfo } from '../../types';
import { Link } from 'react-router-dom';
import { AtSignIcon, StarIcon, TimeIcon } from '@chakra-ui/icons';
import { convertTimeToDate } from '../../utils';

const NewsRow: React.FC<{ row: NewsItemInfo; index: number }> = ({ row, index }) => {
    return (
        <Link to={`/news/${row.id}`}>
            <Box
                as="button"
                maxW={{ xl: '1400px' }}
                w="100%"
                _hover={{ bg: 'gray.50' }}
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
                px={4}
                py={2}
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
            >
                <Box display="flex" alignItems="center">
                    <Badge mr={3} fontSize="xs" colorScheme="gray">
                        {index + 1}
                    </Badge>
                    <Box color="gray.500" fontWeight="medium" fontSize="xs" display="flex" alignItems="center">
                        <StarIcon mr={1} color="gray.600" /> {row.rating}
                    </Box>
                </Box>
                <Box fontWeight="medium" as="h1" fontSize={['md', 'lg']} noOfLines={2} textAlign="left">
                    {row.title}
                </Box>
                <Box display="flex" alignItems="center">
                    <Box fontWeight="medium" fontSize="xs" display="flex" alignItems="center" mr={3} color="orange.500">
                        <AtSignIcon mr={1} /> {row.author}
                    </Box>
                    <Box color="gray.500" fontWeight="medium" fontSize="xs" display="flex" alignItems="center">
                        <TimeIcon mr={1} />
                        {convertTimeToDate(row.time)}
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

export default NewsRow;
