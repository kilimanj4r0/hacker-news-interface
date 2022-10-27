import { Button, Flex, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            as="nav"
            p={4}
            mx="auto"
            maxWidth="1150px"
        >
            <Box>
                <Link to="/news">
                    <Button
                        fontWeight={['medium', 'medium', 'medium']}
                        fontSize={['xs', 'sm', 'lg', 'xl']}
                        variant="ghost"
                        _hover={{ bg: 'rgba(0,0,0,.2)' }}
                        padding={[1, 4]}
                        color="white"
                        letterSpacing="0.65px"
                    >
                        <Text fontSize={['xl', '2xl', '2xl', '2xl']} mr={2} color="orange" fontWeight="black">
                            Y
                        </Text>
                        Hacker News
                    </Button>
                </Link>
            </Box>

            <Box>
                <Link to="/news">
                    <Button
                        fontWeight={['medium', 'medium', 'medium']}
                        fontSize={['xs', 'sm', 'lg', 'xl']}
                        variant="ghost"
                        _hover={{ bg: 'rgba(0,0,0,.2)' }}
                        p={[1, 4]}
                        color="white"
                    >
                        News
                    </Button>
                </Link>
            </Box>
        </Flex>
    );
};

export default Navbar;
