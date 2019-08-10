import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Layout, Row, Col, Menu, List, Card, Spin } from "antd";

const {Content, Sider} = Layout;
const {SubMenu} = Menu;
const {Meta} = Card;
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import WebHeader from "../../components/header-component/header-component";
import WebFooter from "../../components/footer-component/footer-component";
import WebMetaHeader from "../../components/meta-component/meta-component";

const extractHTML = (html) => {
	let span = document.createElement("span");
	span.innerHTML = html;
	return span.textContent || span.innerText;
};

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
		const catName = this.props.match.params["category"];
		const blogsDisplay = [];
		const catBlogList = this.props.Meteor.collection.blogs.filter((blog) => {
			return (blog.categories.includes(catName));
		});

		if (catBlogList.length > 0) {
			const paginationProps = {
				showQuickJumper: true,
				pageSize: 5,
				total: catBlogList.length
			};
			blogsDisplay.push(
				<Card className="card-category"
					  title={this.props.match.params["category"]}>
					<List
						itemLayout="vertical"
						size="large"
						dataSource={catBlogList}
						pagination={paginationProps}
						renderItem={(item) => {
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
									{item.quill}
								</List.Item>
							);
						}}
					/>
				</Card>
			);
			if (!this.props.Meteor.subscription.blogs) {
				blogsDisplay.push(
					<Card className="card-category" title={""}>
						<Meta className="no-bg-meta"
							  title={"正在載入更多文章..."}
							  description={<Spin size="large"/>}
						/>
					</Card>
				)
			}
		} else {
			if (this.props.Meteor.subscription.blogs) {
				blogsDisplay.push(
					<Card className="card-category" title={catName}>
						<Meta className="no-bg-meta"
							  title={"暫 無 文 章"}
							  description={<img src="/assets/images/open-folder-outline-white.png" height="70px"/>}
						/>
					</Card>
				);
			} else {
				blogsDisplay.push(
					<Card className="card-category" title={catName}>
						<Meta className="no-bg-meta"
							  title={"載入中，請稍候..."}
							  description={<Spin size="large"/>}
						/>
					</Card>
				);
			}
		}

		const contentCatClassName = (category) => {
			switch (category) {
				case "衣":
					return "-clothes";
				case "食":
					return "-food";
				case "住":
					return "-living";
				case "行":
					return "-transport";
				default:
					return "";
			}
		};

		return (
			<React.Fragment>
				<WebMetaHeader webtitle={catName}/>
				<div>
					<Layout>
						<Layout>
							<WebHeader/>
							<Content className={"content-container" + contentCatClassName(catName)}>
								{blogsDisplay}
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

const Tracker = withTracker((props) => {
	const catName = props.match.params["category"];
	const blogs_by_cat = Meteor.subscribe("blogs_db_by_cat", catName);
	return {
		Meteor: {
			subscription: {
				blogs: blogs_by_cat.ready()
			},
			collection: {
				blogs: blogs_db.find({}, { transform: function(blog) {
						blog.quill = blog.quill.substring(0, 1000);
						blog.quill = extractHTML(blog.quill).substring(0, 256);
						if (blog.quill.length >= 256)
							blog.quill = blog.quill.substring(0, (blog.quill.indexOf("<") > 0 ? blog.quill.indexOf("<") : 255)) + "...";
						return blog;
					}
				}).fetch()
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

export const CategoryPage = Redux;
