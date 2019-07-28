import React from 'react';
import MetaTags from 'react-meta-tags';

class WebMetaHeader extends React.Component {
    render() {
        // Meta tags
        const meta = {
            title: '昔日香港資料庫',
            meta: {
                charset: 'utf-8',
                viewport: 'width=device-width, initial-scale=1'
            }
        };

        return (
            <MetaTags>
                <title>昔日香港資料庫</title>
                <meta property="og:title" content="昔日香港資料庫" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </MetaTags>
        );
    }
}

export default WebMetaHeader;
