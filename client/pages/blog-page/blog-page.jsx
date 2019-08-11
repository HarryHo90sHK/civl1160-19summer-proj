import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Layout, Menu, Row, Col, Button, ConfigProvider, Card, Spin } from "antd";

const {Content, Sider} = Layout;
const {SubMenu} = Menu;
const {Meta} = Card;
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
		const blogDisplay = [];
		let blogCatFirst, blogCatLength;
		const blog = this.props.Meteor.collection.blog;

		if (!blog) {
			if (this.props.Meteor.subscription.blog) {
				blogDisplay.push(
					<Card className="card-category" title={""}>
						<Meta className="no-bg-meta"
						      title={"文 章 不 存 在"}
						      description={"請檢查網址是否正確"}
						/>
					</Card>
				);
			} else {
				blogDisplay.push(
					<Card className="card-category" title={""}>
						<Meta className="no-bg-meta"
						      title={"載入中，請稍候..."}
						      description={<Spin size="large"/>}
						/>
					</Card>
				);
			}
		} else {
			blogCatFirst = blog.categories[0];
			blogCatLength = blog.categories.length;
			const catButtons = [];
			for (let i = 0; i < blog.categories.length; i++) {
				catButtons.push(
					<Button key={i} onClick={() => {
						this.props.history.push("/categories/" + blog.categories[i]);
					}}>
						{blog.categories[i]}
					</Button>,
				);
			}
			blogDisplay.push(
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
					<br/>
					<hr/>
					<br/>
					<div className="blog-text"
					     dangerouslySetInnerHTML={{
						     __html: blog ? blog.quill : ""
					     }}
					/>
				</div>
			);
			blogDisplay.push(
				<WebFooter/>
			);
			blogDisplay.push(
				<Row className="footer-row" type="flex" justify="center">
					<Col className="hidden"><a onClick={this.siderToggle}>工具箱</a></Col>
				</Row>
			);
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
				<WebMetaHeader webtitle={(blog ? blog.title : "")}/>
				<Layout>
					<Layout>
						<WebHeader/>
						<Content className={"content-container" +
						(this.props.Meteor.subscription.blog ?
							(blogCatLength == 1 ? contentCatClassName(blogCatFirst) : "") :
							"")}>
							{blogDisplay}
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

const Tracker = withTracker((props) => {
	const blogID = props.match.params._id;
	const blogs_by_blog = Meteor.subscribe("blogs_db_by_blog", blogID);
	return {
		Meteor: {
			subscription: {
				blog: blogs_by_blog.ready()
			},
			collection: {
				blog: blogs_db.findOne({"_id": blogID})
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
