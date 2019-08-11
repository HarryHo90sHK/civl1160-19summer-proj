import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Button, Input, message, PageHeader, TreeSelect } from "antd";
import _ from "lodash";
import { EditorComponent } from "../../components/editor-component/editor-component";
import WebMetaHeader from "../../components/meta-component/meta-component";
import { blogs_db } from "../../../shared/collections/blogs";
import { BlogAction } from "../../redux/blog/blog-action";
import "antd/dist/antd.css";
import { styles } from "./styles";

class Component extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quill: "",
			title: "",
			author: "",
			categories: [],
			tempCategory: ""
		};
	}

	render() {
		return (
			<React.Fragment>
				<WebMetaHeader webtitle={"新增文章"}/>
				<PageHeader
					onBack={() => {
						this.props.history.push("/");
					}}
					title="新文章"
				/>
				<div style={styles.container}>
					<u>插入圖片：</u>要使用外部網站圖片或使用 <b><a target="_blank" href="https://imgur.com/upload">Imgur</a></b>、<b><a target="_blank" href="https://pasteboard.co/">Pasteboard</a></b> 等上載圖片，請按<img src="/assets/images/magnifying-glass.png" alt="放大鏡" width="18" height="18"/>貼上圖片網址。否則，請按<img src="/assets/images/quill-img-icon.png" alt="相片標誌" width="18" height="18"/>直接上載至本網站。
				</div>
				<div style={styles.container}>
					<Input
						style={styles.input}
						placeholder="文章標題"
						value={this.state.title}
						onChange={(e) => {
							this.setState({
								title: e.target.value
							});
						}}
					/>
				</div>
				<div style={styles.container}>
					<TreeSelect
						showSearch
						style={styles.input}
						placeholder="文章類別"
						allowClear
						multiple
						value={this.state.categories}
						onChange={(value) => {
							this.setState({
								categories: value
							});
						}}
						onSearch={(value) => {
							this.setState({
								tempCategory: value
							});
						}}
					>
						{
							_.union([
								"衣", "食", "住", "行",
								"昔日報雜", "台前幕後"
							], _.union(_.uniq(this.props.Meteor.collection.blogs.reduce((accumulator, current) => {
								return [
									...accumulator,
									...current.categories
								];
							}, [])), (this.state.tempCategory !== "" ? [
								this.state.tempCategory
							] : []))).map((category, index) => {
								return (
									<TreeSelect.TreeNode
										value={category}
										title={category}
										key={index}
									/>
								);
							})
						}
					</TreeSelect>
				</div>
				<div style={styles.container}>
					<EditorComponent
						value={this.state.quill}
						onChange={(value) => {
							this.setState({
								quill: value
							});
						}}
					/>
				</div>
				<div style={styles.container}>
					<br/><br/>
					<Input
						style={styles.input}
						placeholder="作者姓名（請小心輸入）"
						value={this.state.author}
						onChange={(e) => {
							this.setState({
								author: e.target.value
							});
						}}
					/>
				</div>
				<div style={styles.container}>
					<Button
						type="primary"
						onClick={() => {
							const quill = this.state.quill;
							const title = this.state.title;
							const author = this.state.author;
							const categories = this.state.categories;
							if (title === "" || author === "") {
								message.info("請輸入文章標題及作者姓名");
								return;
							}
							this.props.dispatch(BlogAction.post(quill, title, categories, author));
						}}
					>
						發表文章
					</Button>
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

const Redux = connect(() => {
	return {};
})(Tracker);

export const CreatePage = Redux;
