import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const theme = extendTheme({
    // Set background to blackish color.
    styles: {
        global: {
            'html, body': {
                backgroundColor: 'rgb(26,32,44)',
            },
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
