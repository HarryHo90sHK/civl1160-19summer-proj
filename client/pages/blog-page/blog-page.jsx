import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Layout, Menu, Row, Col, Button, ConfigProvider } from "antd";
const { Content, Sider } = Layout;
const { SubMenu } = Menu;
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import { styles } from "./styles";
import { BlogAction } from "../../redux/blog/blog-action";
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
		const blog = this.props.Meteor.collection.blogs.find((blog) => {
			return (blog._id === this.props.match.params._id);
		});
		if (!blog) {
			return (
				<React.Fragment/>
			);
		}
		const catButtons = [];
		for (let i = 0; i < blog.categories.length; i++) {
			catButtons.push(
				<Button key={i}>
					{blog.categories[i]}
				</Button>,
			);
		}
		return (
			<React.Fragment>
				<WebMetaHeader />
				<Layout>
					<Layout>
						<WebHeader />
						<Content className="content-container">
							<div className="blog-content">
								<div className="blog-title">
									{blog ? blog.title : ""}
								</div>
								<div className="blog-meta">
									<p>{blog ? "作者：" + blog.author : ""}</p>
									<div>
										<ConfigProvider autoInsertSpaceInButton={false}>
											{catButtons}
										</ConfigProvider>
									</div>
								</div>
								<br /><hr /><br />
								<div className="blog-text"
									dangerouslySetInnerHTML={{
										__html: blog ? blog.quill : ""
									}}
								/>
							</div>
							<WebFooter />
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
										this.props.history.push("/blogs/edit/" + this.props.match.params._id);
									}}
								>
									<span>編輯文章</span>
								</Menu.Item>
								<Menu.Item
									onClick={() => {
										if (window.confirm("是否確定要刪除此文章？"))
											this.props.dispatch(BlogAction.remove(this.props.match.params._id));
									}}
								>
									<span>刪除文章</span>
								</Menu.Item>
							</SubMenu>
						</Menu>
					</Sider>
				</Layout>
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

const Redux = connect(() => {
	return {};
})(Tracker);

export const BlogPage = Redux;
