import React from 'react';
import DocumentMeta from 'react-document-meta';

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
            <DocumentMeta {...meta} />
        );
    }
}

export default WebMetaHeader;
