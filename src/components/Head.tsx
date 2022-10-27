import React from 'react';
import { Favicon } from './Favicon';

const Head: React.FC<{ title: string }> = ({ title }) => {
    return (
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{title}</title>
            <Favicon />
        </head>
    );
};

export default Head;
