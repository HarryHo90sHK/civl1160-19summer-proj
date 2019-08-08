import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Layout, Row, Col, Card } from "antd";
const { Content } = Layout;
const { Meta } = Card;
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import { styles } from "./styles";
import WebHeader from "../../components/header-component/header-component";
import WebFooter from "../../components/footer-component/footer-component";
import WebMetaHeader from "../../components/meta-component/meta-component";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const cardCatGridStyle = {
			width: '100%',
			textAlign: 'center',
		};

		return (
			<React.Fragment>
				<WebMetaHeader webtitle={"更多資料"}/>
				<div>
					<Layout>
						<Layout>
							<WebHeader />
							<Content className="content-container">
								<Card className="card-category" title="更多資料">
									<Row className="category-card-row" type="flex" justify="space-around">
										<Col><Card
											style={{ height: 380, width: 300 }}
											cover={<a href={"/categories/昔日報雜"}><img className="card-cover" src="https://cdn.pixabay.com/photo/2015/01/04/15/07/magazines-588346_960_720.jpg"/></a>}
										>
											<Meta title="昔日報雜" description="翻閱舊時刊物原文"/>
										</Card></Col>
										<Col><Card
											style={{ height: 380, width: 300 }}
											cover={<a href={"/categories/台前幕後"}><img className="card-cover" src="https://cdn.pixabay.com/photo/2017/07/31/11/21/people-2557396_960_720.jpg"/></a>}
										>
											<Meta title="台前幕後" description="網站工作人員名單"/>
										</Card></Col>
									</Row>
								</Card>
								<WebFooter />
							</Content>
						</Layout>
					</Layout>
				</div>
			</React.Fragment>
		);
	}

}

const Tracker = withTracker(() => {
	Meteor.subscribe("blogs_db");
	return {
		Meteor: {
			collection: {
				blogs: blogs_db.find().fetch()
			},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Component);

const Redux = connect((store) => {
	return {};
})(Tracker);

export const ExtraPage = Redux;
