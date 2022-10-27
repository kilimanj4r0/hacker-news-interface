import React from 'react';
import { useParams } from 'react-router-dom';
import { getNewsItem } from '../api';
import { Divider, Flex } from '@chakra-ui/react';
import NewsBlockHeader from '../components/NewsBlock/NewsBlockHeader';
import NewsComments from '../components/NewsBlock/NewsComments';
import { setNewsItem } from '../redux/newsSlice';
import { useAppDispatch } from '../hooks';

const NewsBlock: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [areNewsLoaded, setAreNewsLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        setAreNewsLoaded(false);
        getNewsItem(id).then((data) => {
            dispatch(setNewsItem(data));
            setAreNewsLoaded(true);
        });
    }, []);

    return (
        <Flex direction="column" maxW={{ xl: '1400px' }} px={[1, 4]}>
            <NewsBlockHeader areNewsLoaded={areNewsLoaded} />
            <Divider my={5} />
            <NewsComments areNewsLoaded={areNewsLoaded} />
        </Flex>
    );
};

export default NewsBlock;
