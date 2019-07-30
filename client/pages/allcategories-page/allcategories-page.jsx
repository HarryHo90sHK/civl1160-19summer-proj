import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {Layout, Row, Col, Menu, List, Card, Button} from "antd";

const {Content, Sider} = Layout;
const {SubMenu} = Menu;
const {Meta} = Card;
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import WebHeader from "../../components/header-component/header-component";
import WebFooter from "../../components/footer-component/footer-component";
import WebMetaHeader from "../../components/meta-component/meta-component";
import _ from "lodash";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	state = {
		collapsed: true
	};

	siderToggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {
		const contentCatClassName = () => {
			return "-allcategories";
		};

		const catBlogsCards = [];
		const catList = _.without(_.uniq(this.props.Meteor.collection.blogs.reduce((accumulator, current) => {
			return [
				...accumulator,
				...current.categories
			];
		}, [])), "衣", "食", "住", "行", "昔日報雜", "台前幕後");
		for (let i = 0; i < catList.length; i++) {
			const catBlogList = this.props.Meteor.collection.blogs.filter((blog) => {
				return (blog.categories.includes(catList[i]));
			});
			if (catBlogList.length == 0)
				continue;
			catBlogsCards.push(
				<Card className="card-category" title={catList[i]}>
					<List
						itemLayout="vertical"
						size="large"
						dataSource={catBlogList}
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
											<a href={"/blogs/view/" + item._id}>
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
		if (catBlogsCards.length == 0) {
			catBlogsCards.push(
				<Card className="card-category" title={""}>
					<Meta className="no-bg-meta"
						title={"暫 無 其 他 分 類"}
						description={<img src="/assets/images/open-folder-outline-white.png" height="70px" />}
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
							<Content className={"content-container" + contentCatClassName()}>
								{catBlogsCards}
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

export const AllCategoriesPage = Redux;
