import React from 'react';

import { Box, Heading } from '@chakra-ui/react';
import { NewsItemInfo } from '../../types';

const NewsRow: React.FC<{ row: NewsItemInfo }> = ({ row }) => {
    return (
        <Box rounded="md" bg="purple.400" color="white" px="15px" py="15px">
            <Heading size="md">{row.title}</Heading>
        </Box>
    );
};

export default NewsRow;
