import React from 'react';
import MetaTags from 'react-meta-tags';

class WebMetaHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MetaTags>
                <title>{this.props.webtitle + (this.props.webtitle === "" ? "" : " | ") + "昔日香港資料庫"}</title>
                <meta property="og:title" content={this.props.webtitle + (this.props.webtitle === "" ? "" : " | ") + "昔日香港資料庫"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </MetaTags>
        );
    }
}

export default WebMetaHeader;
