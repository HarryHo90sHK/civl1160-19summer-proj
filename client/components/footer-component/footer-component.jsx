import React from 'react';
import {Row, Col, Card} from 'antd';
import "antd/dist/antd.css";
import { styles } from "./styles";

class WebFooter extends React.Component {
    render() {
        return (
            <Row className="footer-row" type="flex" justify="center">
                <Col>
                    本網站由一組香港科技大學（CIVL1160課程）學生建立及管理，旨在重溫昔日香港之各種風貌，不涉任何商業活動。<br />
                    如有任何查詢或意見，請電郵我們 (wyhoaj@connect.ust.hk) 或指導老師 (thomashu@ust.hk)<br /><br />
                </Col>
            </Row>
        );
    }
}

export default WebFooter;
