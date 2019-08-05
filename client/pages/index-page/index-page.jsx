import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Layout, Row, Col, Menu, List, Card } from "antd";

const {Content, Sider} = Layout;
const {SubMenu} = Menu;
const {Meta} = Card;
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

	state = {
		collapsed: true
	}

	siderToggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		const latestBlogsList = this.props.Meteor.collection.blogs;

		const latestBlogsDisplay = [];
		if (latestBlogsList.length > 0) {
			const paginationProps = {
				showQuickJumper: true,
				pageSize: 5,
				total: latestBlogsList.length
			}
			latestBlogsDisplay.push(
				<Card className="card-category" title="所有文章">
					<List
						itemLayout="vertical"
						size="large"
						dataSource={this.props.Meteor.collection.blogs}
						pagination={paginationProps}
						renderItem={(item) => {
							const extract = (html) => {
								let span = document.createElement("span");
								span.innerHTML = html;
								return span.textContent || span.innerText;
							};
							return (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={(
											<a
												onClick={() => {
													this.props.history.push("/blogs/view/" + item._id);
												}}
											>
												{item.title}
											</a>
										)}
										description={
											(item.author ? "" + item.author : "") +
											(item.categories ? " | " + item.categories.join('、') : "")
										}
									/>
									{extract(item.quill).length > 255 ?
										extract(item.quill).substring(0, 255) + "..." :
										extract(item.quill)}
								</List.Item>
							);
						}}
					/>
				</Card>
			);
		}

		return (
			<React.Fragment>
				<WebMetaHeader/>
				<div>
					<Layout>
						<Layout>
							<WebHeader/>
							<Content className="content-container">
								<Card className="card-category" title="文章分類">
									<Row className="category-card-row" type="flex" justify="space-around">
										<Col><Card
											style={{height: 380, width: 300}}
											cover={
												<a
													onClick={() => {
														this.props.history.push("/categories/衣");
													}}
												>
													<img className="card-cover"
													     src="https://static.wixstatic.com/media/06ac5c_51ee1cb636774e899bb5362dc852cf2b~mv2.jpg"/>
												</a>
											}
										>
											<Meta title="衣" description="日常衣著"/>
										</Card></Col>
										<Col><Card
											style={{height: 380, width: 300}}
											cover={
												<a
													onClick={() => {
														this.props.history.push("/categories/食");
													}}
												>
													<img className="card-cover"
													     src="https://static.wixstatic.com/media/06ac5c_fe2785587811487f852cf020e57eba0e~mv2_d_1600_1275_s_2.jpg"/>
												</a>
											}
										>
											<Meta title="食" description="日常飲食"/>
										</Card></Col>
										<Col><Card
											style={{height: 380, width: 300}}
											cover={
												<a
													onClick={() => {
														this.props.history.push("/categories/住");
													}}
												>
													<img className="card-cover"
													     src="https://static.wixstatic.com/media/06ac5c_b4a33a791ab64e74813608c1b91f9892~mv2.jpg"/>
												</a>
											}
										>
											<Meta title="住" description="日常居住"/>
										</Card></Col>
										<Col><Card
											style={{height: 380, width: 300}}
											cover={<a
												onClick={() => {
													this.props.history.push("/categories/行");
												}}
											><
												img className="card-cover"
												    src="https://static.wixstatic.com/media/06ac5c_8b1d4fb84eb74f91884bc193d74f8c35~mv2.jpg"/>
											</a>
											}
										>
											<Meta title="行" description="日常出行"/>
										</Card></Col>
										<Col><Card
											style={{height: 380, width: 300}}
											cover={
												<a
													onClick={() => {
														this.props.history.push("/categories");
													}}
												>
													<img className="card-cover"
													     src="https://static.wixstatic.com/media/06ac5c_9b4fcc7a40a14cb1a7bce31147385bf2~mv2.jpg"/>
												</a>
											}
										>
											<Meta title="其他分類" description="娛樂、運動、科技、社會等類"/>
										</Card></Col>
									</Row>
								</Card>
								{latestBlogsDisplay}
								<WebFooter/>
								<Row className="footer-row" type="flex" justify="center">
									<Col className="hidden"><a onClick={this.siderToggle}>工具箱</a></Col>
								</Row>
							</Content>
						</Layout>
						<Sider className="sider-alwaystop" collapsible collapsed={this.state.collapsed}
						       collapsedWidth="0" trigger={null} theme="light">
							<Menu theme="light" mode="inline">
								<SubMenu title={<span>管理文章</span>}>
									<Menu.Item
										onClick={() => {
											this.props.history.push("/blogs/new");
										}}
									>
										<span>新增文章</span>
									</Menu.Item>
								</SubMenu>
							</Menu>
						</Sider>
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

export const IndexPage = Redux;
