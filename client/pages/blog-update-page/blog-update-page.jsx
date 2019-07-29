import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Button, PageHeader, TreeSelect } from "antd";
import { EditorComponent } from "../../components/editor-component/editor-component";
import WebMetaHeader from "../../components/meta-component/meta-component";
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import { styles } from "./styles";
import { BlogAction } from "../../redux/blog/blog-action";
import _ from "lodash";

class Component extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quill: "",
			categories: [],
			tempCategory: ""
		};
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
		return (
			<React.Fragment>
				<WebMetaHeader />
				<PageHeader
					onBack={() => {
						this.props.history.push("/");
					}}
					title={(blog ? blog.title : "")}
				/>
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
								"clothing",
								"food",
								"living",
								"transport"
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
					<Button
						type="primary"
						onClick={() => {
							const quill = this.state.quill;
							const categories = this.state.categories;
							this.props.dispatch(BlogAction.edit(this.props.match.params._id, quill, categories));
						}}
					>
						更新文章
					</Button>
				</div>
			</React.Fragment>
		);
	}

	componentDidMount() {
		const blog = this.props.Meteor.collection.blogs.find((blog) => {
			return (blog._id === this.props.match.params._id);
		});
		if (blog) {
			this.setState({
				quill: blog.quill,
				categories: blog.categories
			});
		}
	}

	componentDidUpdate(prevProp, prevState, snapshot) {
		const cache = prevProp.Meteor.collection.blogs.find((blog) => {
			return (blog._id === this.props.match.params._id);
		});
		const blog = this.props.Meteor.collection.blogs.find((blog) => {
			return (blog._id === this.props.match.params._id);
		});
		if (cache === undefined && blog !== undefined) {
			this.setState({
				quill: blog.quill,
				categories: blog.categories
			});
		}
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

export const BlogUpdatePage = Redux;
