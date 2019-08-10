import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {Layout, Row, Col, Menu, List, Card, Button, Spin} from "antd";

const {Content, Sider} = Layout;
const {SubMenu} = Menu;
const {Meta} = Card;
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import WebHeader from "../../components/header-component/header-component";
import WebFooter from "../../components/footer-component/footer-component";
import WebMetaHeader from "../../components/meta-component/meta-component";
import _ from "lodash";

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
		const catBlogsCards = [];
		const catList = _.without(_.uniq(this.props.Meteor.collection.blogs.reduce((accumulator, current) => {
			return [
				...accumulator,
				...current.categories
			];
		}, [])), "衣", "食", "住", "行", "昔日報雜", "台前幕後");

		if (catList.length > 0) {
			for (let i = 0; i < catList.length; i++) {
				const catBlogList = this.props.Meteor.collection.blogs.filter((blog) => {
					return (blog.categories.includes(catList[i]));
				});
				if (catBlogList.length == 0) {
					if (!this.props.Meteor.subscription.blogs) {
						catBlogsCards.push(
							<Card className="card-category" title={catList[i]}>
								<Meta className="no-bg-meta"
									  title={"載入中，請稍候..."}
									  description={<Spin size="large"/>}
								/>
							</Card>
						)
					}
					continue;
				}
				const paginationProps = {
					showQuickJumper: true,
					pageSize: 5,
					total: catBlogList.length
				};
				catBlogsCards.push(
					<Card className="card-category" title={catList[i]}>
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
										{extractHTML(item.quillextr).length > 255 ?
											extractHTML(item.quillextr).substring(0, 255) + "..." :
											extractHTML(item.quillextr)}
									</List.Item>
								);
							}}
						/>
					</Card>
				);
				if (!this.props.Meteor.subscription.blogs) {
					catBlogsCards.push(
						<Card className="card-category" title={""}>
							<Meta className="no-bg-meta"
								  title={"正在載入更多文章..."}
								  description={<Spin size="large"/>}
							/>
						</Card>
					)
				}
			}
		} else {
			if (this.props.Meteor.subscription.blogs) {
				catBlogsCards.push(
					<Card className="card-category" title={""}>
						<Meta className="no-bg-meta"
							  title={"暫 無 其 他 分 類"}
							  description={<img src="/assets/images/open-folder-outline-white.png" height="70px"/>}
						/>
					</Card>
				);
			} else {
				catBlogsCards.push(
					<Card className="card-category" title={""}>
						<Meta className="no-bg-meta"
							  title={"載入中，請稍候..."}
							  description={<Spin size="large"/>}
						/>
					</Card>
				);
			}
		}

		const contentCatClassName = () => {
			return "-allcategories";
		};

		return (
			<React.Fragment>
				<WebMetaHeader webtitle={"其他分類"}/>
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

const Tracker = withTracker((props) => {
	const exclCatList = ["衣", "食", "住", "行", "昔日報雜", "台前幕後"];
	const blogs_by_excl_only_cat = Meteor.subscribe("blogs_db_excl_only_cat", exclCatList);
	return {
		Meteor: {
			subscription: {
				blogs: blogs_by_excl_only_cat.ready()
			},
			collection: {
				blogs: blogs_db.find({
					$expr: {
						$project: {
							quill: 0,
							quillextr: { $substr: [ "$quill", 0, 1000 ] }
						}
					}
				}, { transform: function(blog) {
						blog.quillextr = extractHTML(blog.quillextr).substring(0, 256).
						substring(0, (blog.quillextr.indexOf("<") > 0 ? blog.quillextr.indexOf("<") : 256));
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

export const AllCategoriesPage = Redux;
