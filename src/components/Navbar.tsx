import { Button, Flex, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { colors } from '../design/colors';

const Navbar = () => {
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            height="50px"
            as="nav"
            p={4}
            mx="auto"
        >
            <Box>
                <Link to="/news">
                    <Button
                        fontWeight="medium"
                        fontSize={['lg', 'xl']}
                        variant="ghost"
                        _hover={{ bg: 'gray.50' }}
                        padding={[1, 4]}
                    >
                        <Text fontSize={['xl', '2xl']} mr={2} color={colors.primary} fontWeight="black">
                            Y
                        </Text>
                        Hacker News
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
};

export default Navbar;
