import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Button, Input, message, PageHeader, TreeSelect } from "antd";
import _ from "lodash";
import { EditorComponent } from "../../components/editor-component/editor-component";
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
				<PageHeader
					onBack={() => {
						this.props.history.push("/");
					}}
					title="Create Blog Post"
				/>
				<div style={styles.container}>
					<Input
						style={styles.input}
						placeholder="Title"
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
						placeholder="select categories"
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
							_.union(_.uniq(this.props.Meteor.collection.blogs.reduce((accumulator, current) => {
								return [
									...accumulator,
									...current.categories
								];
							}, [])), (this.state.tempCategory !== "" ? [
								this.state.tempCategory
							] : [])).map((category, index) => {
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
					<Input
						style={styles.input}
						placeholder="Author"
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
							if (title === "") {
								message.info("Title cannot be blank.");
								return;
							}
							this.props.dispatch(BlogAction.post(quill, title, categories, author));
						}}
					>
						Submit
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
