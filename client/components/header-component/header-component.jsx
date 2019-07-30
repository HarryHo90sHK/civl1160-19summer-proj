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
                    <Col><a href={"/"}>首頁</a></Col>
                    <Col><a href={"/categories/衣"}>衣</a></Col>
                    <Col><a href={"/categories/食"}>食</a></Col>
                    <Col><a href={"/categories/住"}>住</a></Col>
                    <Col><a href={"/categories/行"}>行</a></Col>
                    <Col><a href={"/categories"}>其他分類</a></Col>
                    <Col><a href={"/extra"}>其他</a></Col>
                </Row>
            </Header>
        );
    }
}

export default WebHeader;
