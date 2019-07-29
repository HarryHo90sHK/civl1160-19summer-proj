import React from 'react';
import { Row, Col, Layout } from 'antd';
const { Header } = Layout;
import "antd/dist/antd.css";
import { styles } from "./styles";

class WebHeader extends React.Component {
    render() {
        return (
            <Header className="header-container">
                <div className="title-header">昔日香港資料庫</div>
                <Row className="header-row" type="flex" justify="space-around" align="middle">
                    <Col>
                        <a href={"/"}>首頁</a>
                    </Col>
                    <Col><a href="/categories/clothing">衣</a></Col>
                    <Col><a href="/categories/food">食</a></Col>
                    <Col><a href="/categories/living">住</a></Col>
                    <Col><a href="/categories/transport">行</a></Col>
                    <Col><a>娛樂</a></Col>
                    <Col><a>運動</a></Col>
                    <Col><a>科技</a></Col>
                    <Col><a>社會</a></Col>
                    <Col>
                        <a href={"/extra"}>其他</a>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default WebHeader;
